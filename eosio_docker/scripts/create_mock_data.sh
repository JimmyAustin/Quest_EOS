
#!/bin/bash

echo "=== start deploy data ==="

cleos() {
  /opt/eosio/bin/cleos "$@"
}

# cd into script's folder
cd "$(dirname "$0")"

echo "=== start create accounts in blockchain ==="

# import bobross account private key and create mock posts under bobross
cleos wallet import -n blogwallet --private-key 5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5

# download jq for json reader, we use jq here for reading the json file ( accounts.json )
mkdir -p ~/bin && curl -sSL -o ~/bin/jq https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 && chmod +x ~/bin/jq && export PATH=$PATH:~/bin

# loop through the array in the json file and run createpost action on smart contract to add mock data

jq -c '.[]' mock_data.json | while read i; do
  timestamp=$(jq -r '.timestamp' <<< "$i")
  hash=$(jq -r '.hash' <<< "$i")
  latitude=$(jq -r '.latitude' <<< "$i")
  longitude=$(jq -r '.longitude' <<< "$i")
  accuracy=$(jq -r '.accuracy' <<< "$i")

  # push the createpost action to the smart contract
  cleos push action blogaccount createimage "[ $timestamp, "\""bobross"\"", "\""$hash"\"", "\""$latitude"\"", "\""$longitude"\"", "\""$accuracy"\""]" -p bobross@active
done

jq -c '.[]' mock_data_createbounty.json | while read i; do
  timestamp=$(jq -r '.timestamp' <<< "$i")
  name=$(jq -r '.name' <<< "$i")
  hash=$(jq -r '.hash' <<< "$i")
  latitude=$(jq -r '.latitude' <<< "$i")
  longitude=$(jq -r '.longitude' <<< "$i")

  # push the createpost action to the smart contract
  cleos push action blogaccount createbounty "[ $timestamp, "\""bobross"\"", "\""$name"\"", "\""$hash"\"", "\""$latitude"\"", "\""$longitude"\""]" -p bobross@active
done