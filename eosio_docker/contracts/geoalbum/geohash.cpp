/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <string>
#include <eosiolib/eosio.hpp>

using std::string;

class geohash : public eosio::contract {
   public:

      geohash(account_name self) : eosio::contract(self) {

      }

      //@abi action
      void createbounty(const account_name author, const string hash, const double longitude, const double latitude) {

        bounty_index bounties(_self, _self);

         // Store new offer
         bounties.emplace(_self, [&](auto& bounty){
            bounty.id         = bounties.available_primary_key();
            bounty.author     = author;
            bounty.hash       = hash;
            bounty.latitude   = latitude;
            bounty.longitude  = longitude;
         });

      }

   private:
      //@abi table bounty i64
      struct bounty {
         uint64_t          id;
         account_name      author;
         string            hash;
         double            longitude;
         double            latitude;

         uint64_t primary_key()const { return id; }

         EOSLIB_SERIALIZE( bounty, (id)(author)(hash)(longitude)(latitude) )
      };

      typedef eosio::multi_index< N(bounty), bounty> bounty_index;
};

EOSIO_ABI( geohash, (createbounty) )
