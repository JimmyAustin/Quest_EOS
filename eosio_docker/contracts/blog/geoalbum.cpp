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
  void creategeoimage(const uint64_t timestamp, const account_name author, const uint256_t &hash, 
                      const uint64_t latitude, const uint64_t longitude, const uint64_t accuracy)
  {
    // check if authorized for account to sign action
    // if you are not authorized then this action will be aborted
    // and the transaction will by rolled back - any modifications will be reset
    require_auth(author);

    uint128_t skey = static_cast<uint128_t>(author) << 64 | timestamp; 
    // post_table is our multi_index
    // multi_index is how you store persistant data across actions in EOSIO
    // each action has a new action context which is a clean working memory with no prior working state from other action executions
    geoimage_table geoimagestable(_self, _self); // code, scope

    // add a record to our multi_index table poststable
    // const_iterator emplace( uint64_t payer, Lambda&& constructor )
    poststable.emplace(author, [&](auto &post) {
      post.pkey = poststable.available_primary_key();
      post.skey = skey;
      post.author = author;
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
    uint128_t skey;
    uint256_t hash;
    uint128_t latlong;
    uint64_t latitude;
    uint64_t longitude;
    uint64_t accuracy;

    // primary key
    uint64_t primary_key() const { return pkey; }

    // secondary key
    uint128_t get_by_skey() const { return skey; }

    uint128_t get_by_latlong() const { return latlong; }

    // call macro
    EOSLIB_SERIALIZE(post_struct, (pkey)(timestamp)(author)(skey)(hash)(latitude)(longitude)(accuracy))
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
    uint256_t name;
    uint64_t target_time;
    uint128_t skey;
    uint256_t ref_hash;
    uint128_t latlong;
    uint64_t latitude;
    uint64_t longitude;

    // primary key
    uint64_t primary_key() const { return pkey; }

    // secondary key
    uint128_t get_by_skey() const { return skey; }

    uint128_t get_by_latlong() const { return latlong; }

    // call macro
    EOSLIB_SERIALIZE(post_struct, (pkey)(author)(name)(target_time)(skey)(ref_hash)(latlong)(latitiude)(longitude))
  };

  // typedef multi_index<N(table_name), object_template_to_use, other_indices> multi_index_name;
  typedef eosio::multi_index<N(posts), post_struct,
                      indexed_by<N(getbyskey), const_mem_fun<post_struct, uint128_t, &post_struct::get_by_skey>>>
      post_table;
};

EOSIO_ABI(blog, (createpost)(deletepost)(likepost)(editpost))