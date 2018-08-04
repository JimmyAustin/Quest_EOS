#include "geoalbum.hpp"

using namespace eosio;
using std::string;

class geoalbum : public contract
{
  // blog class inherits the “contract” smart contract and use its constructor below
  using contract::contract;
public:
  // contract constructor
  explicit geoalbum(account_name self) : contract(self) {}

  // mark with @abi action so that eosiocpp will add this as an action to the ABI

  //@abi action
  void createimage(const uint64_t timestamp, const account_name author, const string &hash, 
                   const uint64_t bounty_author, const uint64_t bounty_timestamp,
                   const uint64_t latitude, const uint64_t longitude, const uint64_t accuracy)
  {

    geobounty_table geobountiestable(_self, _self); // code, scope

    // get object by secondary key
    auto bounties = geobountiestable.get_index<N(getbyskey)>();
    uint128_t skey = static_cast<uint128_t>(bounty_author) << 64 | bounty_timestamp; 
    auto bounty = bounties.find(skey);
    eosio_assert(bounty != bounties.end(), "Bounty has not been found");
    eosio_assert(bounty->claimed == true, "Bounty has been claimed");

    // check if authorized for account to sign action
    // if you are not authorized then this action will be aborted
    // and the transaction will by rolled back - any modifications will be reset
    require_auth(author);

    uint128_t author_skey = static_cast<uint128_t>(author) << 64 | timestamp; 
    // post_table is our multi_index
    // multi_index is how you store persistant data across actions in EOSIO
    // each action has a new action context which is a clean working memory with no prior working state from other action executions
    geoimage_table geoimagestable(_self, _self); // code, scope

    // add a record to our multi_index table poststable
    // const_iterator emplace( uint64_t payer, Lambda&& constructor )
    geoimagestable.emplace(author, [&](auto &post) {
      post.pkey = geoimagestable.available_primary_key();
      post.skey = author_skey;
      post.author = author;
      post.bounty_id = bounty->pkey;
    });
  }


  //@abi action
  void createbounty(const uint64_t timestamp, const account_name author, const string &name,
                    const uint64_t bounty_amount, 
                    const string &hash, const uint64_t latitude, const uint64_t longitude)
  {

    // check if authorized for account to sign action
    // if you are not authorized then this action will be aborted
    // and the transaction will by rolled back - any modifications will be reset
    require_auth(author);

    uint128_t skey = static_cast<uint128_t>(author) << 64 | timestamp; 
    // post_table is our multi_index
    // multi_index is how you store persistant data across actions in EOSIO
    // each action has a new action context which is a clean working memory with no prior working state from other action executions
    geobounty_table geobountiestable(_self, _self); // code, scope

    // add a record to our multi_index table poststable
    // const_iterator emplace( uint64_t payer, Lambda&& constructor )

    // TODO: ACTUALLY TAKE THE BOUNTY AMOUNT FROM THE USER
    // VERIFY THIS WORKS
    action(
        permission_level{ author, N(active) },
        N(eosio.token), N(transfer),
        std::make_tuple(author, _self, bounty_amount, std::string(""))
    ).send();

    geobountiestable.emplace(author, [&](auto &bounty) {
      bounty.pkey = geobountiestable.available_primary_key();
      bounty.skey = skey;
      bounty.author = author;
      bounty.bounty_amount = bounty_amount;
    });
  }

  //@abi action
  void award_bounty(const uint64_t bounty_timestamp, const account_name bounty_author, 
                    const account_name image_author, const uint64_t image_timestamp)
  {

    // check if authorized for account to sign action
    // if you are not authorized then this action will be aborted
    // and the transaction will by rolled back - any modifications will be reset
    require_auth(bounty_author);

    geobounty_table geobountiestable(_self, _self); // code, scope
    uint128_t skey = static_cast<uint128_t>(bounty_author) << 64 | bounty_timestamp; 
    auto bounties = geobountiestable.get_index<N(getbyskey)>();
    auto bounty = geobountiestable.find(skey);
    
    eosio_assert(bounty->claimed == false, "Bounty has already been claimed");

    geobountiestable.modify(bounty, bounty_author, [&]( auto& bounty ) {
      bounty.claimed = true;
    });

    geoimage_table geoimagestable(_self, _self); // code, scope
    uint128_t image_skey = static_cast<uint128_t>(image_author) << 64 | image_timestamp; 
    auto image = geoimagestable.find(image_skey);
    eosio_assert(image->bounty_id == bounty->pkey, "Image isnt related to bounty");

    geoimagestable.modify(image, bounty_author, [&]( auto& image ) {
      image.accepted = true;
    });

    action(
      permission_level{ _self, N(active) },
      N(eosio.token), N(transfer),
      std::make_tuple(_self, image_author, bounty->bounty_amount, std::string(""))
    ).send();
    // TODO: TRANSFORM MONEY BETWEEN CONTRACT AND IMAGE AUTHOR
    // TODO: VERIFY
  }

  //@abi action
  void reject_image(const uint64_t bounty_timestamp, const account_name bounty_author, 
                    const account_name image_author, const uint64_t image_timestamp)
  {
    // check if authorized for account to sign action
    // if you are not authorized then this action will be aborted
    // and the transaction will by rolled back - any modifications will be reset
    require_auth(bounty_author);

    geobounty_table geobountiestable(_self, _self); // code, scope
    uint128_t skey = static_cast<uint128_t>(bounty_author) << 64 | bounty_timestamp; 
    auto bounties = geobountiestable.get_index<N(getbyskey)>();
    auto bounty = bounties.find(skey);
    
    eosio_assert(bounty->claimed == false, "Bounty has already been claimed");

    geoimage_table geoimagestable(_self, _self); // code, scope
    uint128_t image_skey = static_cast<uint128_t>(image_author) << 64 | image_timestamp;
    auto image = geoimagestable.find(image_skey);

    geoimagestable.modify(image, image_author, [&]( auto& image ) {
      image.rejected = true;
    });  
  }

private:
  // mark with @abi table so that eosiocpp will add this as a multi_index to the ABI with an index of type i64

  //@abi table posts i64

  // timestamp uint64
  // account_name author
  // hash string
  // lat int
  // long int
  // accuracy int

  struct geoimage_struct
  {
    uint64_t pkey;
    uint64_t timestamp;
    uint64_t author;
    uint64_t bounty_id;
    uint128_t skey;
    string hash;
    uint64_t latitude;
    uint64_t longitude;
    uint64_t accuracy;
    uint64_t accepted;
    uint64_t rejected;
    // primary key
    uint64_t primary_key() const { return pkey; }

    // secondary key
    uint128_t get_by_skey() const { return skey; }

    // call macro
    EOSLIB_SERIALIZE(geoimage_struct, (pkey)(timestamp)(author)(bounty_id)(skey)(hash)(latitude)(longitude)(accuracy)(accepted)(rejected))
  };

  struct geobounty_struct
  {

  // pkey - int
  // name
  // coords
  // bounty/day/dollar
  // targetTime - when we want the image
  // (ref ipfs hash)

    uint64_t pkey;
    uint64_t author;
    uint128_t skey;
    string name;
    string hash;
    uint64_t latitude;
    uint64_t longitude;
    uint64_t bounty_amount;
    uint64_t claimed;


    // primary key
    uint64_t primary_key() const { return pkey; }

    // secondary key
    uint128_t get_by_skey() const { return skey; }

    // call macro
    EOSLIB_SERIALIZE(geobounty_struct, (pkey)(author)(name)(skey)(hash)(latitude)(longitude)(bounty_amount)(claimed))
  };

  // typedef multi_index<N(table_name), object_template_to_use, other_indices> multi_index_name;
  typedef eosio::multi_index<N(geoimages), geoimage_struct,
                      indexed_by<N(getbyskey), const_mem_fun<geoimage_struct, uint128_t, &geoimage_struct::get_by_skey>>>
      geoimage_table;

  // typedef multi_index<N(table_name), object_template_to_use, other_indices> multi_index_name;
  typedef eosio::multi_index<N(geobounties), geobounty_struct,
                      indexed_by<N(getbyskey), const_mem_fun<geobounty_struct, uint128_t, &geobounty_struct::get_by_skey>>>
      geobounty_table;

};

EOSIO_ABI(geoalbum, (createimage))