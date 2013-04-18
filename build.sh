#!/bin/bash

# Store the credentials to the server in here so we don't publish them in the git history
# Build-private.sh should declare:
# SERVER=http://adminuser:password@couchdbserver
# DATA_DB="space separated list of databases to upload view and template info to"
. `dirname $0`/build-private.sh

STATIC_ROOT="forms/_design/data"
SC_DB="forms"
APP_ROOT="couchapps/data/_attachments"
BUILD_DATE=`date +'%m/%d/%Y'`
#
bin/sc-build forms
build=`bin/sc-build-number forms`
rm -rf couchapps/data/_attachments
mv "tmp/build/$STATIC_ROOT" couchapps/data/_attachments

echo "Generating Cache Manifest"
MANIFEST="$APP_ROOT/manifest.appcache"
echo "CACHE MANIFEST" > "$MANIFEST"

echo "https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js" >> "$MANIFEST"
find $APP_ROOT -type f | grep -v "sproutcore/.*/source/" | grep -v manifest.appcache | sed "s!$APP_ROOT/!/$STATIC_ROOT/!" >> "$MANIFEST"
echo "NETWORK:" >> "$MANIFEST"
echo "*" >> "$MANIFEST"

sed -i -e "s!<html!<html manifest=\"/$STATIC_ROOT/manifest.appcache\"!" "$APP_ROOT/forms/en/$build/index.html"
sed -i -e "s!%BUILDDATE%!$BUILD_DATE!g" "$APP_ROOT/forms/en/$build/javascript-packed.js"

cp "$APP_ROOT/forms/en/$build/index.html" "$APP_ROOT/index.html"
cp "assets/extension/extension.crx" "$APP_ROOT/datforms.crx"

echo "Pushing Data"
couchapp push couchapps/data "$SERVER/$SC_DB"
for db in $DATA_DB
do
echo "Pushing Views to $db"
couchapp push couchapps/views "$SERVER/$db"
echo "Pushing Price List to $db"
couchapp pushdocs couchapps/price_list "$SERVER/$db"
done

DOC_REV=`curl -X HEAD -vvv -H "Connection: close" $SERVER/$SC_DB/_design/data 2>&1 | sed -nEe '/ETag/s/[^0-9]*([0-9]+\-[0-9a-f]+).*/\1/p'`
echo "Updating manifest content type at rev $DOC_REV"

curl -X PUT -H "Content-Type: text/cache-manifest" --data-binary "@$APP_ROOT/manifest.appcache" "$SERVER/$SC_DB/_design/data/manifest.appacache?rev=$DOC_REV"

echo "Compacting old app versions"
curl -X POST -H "Content-Type: application/json" "$SERVER/$SC_DB/_compact"