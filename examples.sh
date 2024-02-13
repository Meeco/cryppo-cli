#!/bin/sh

./bin/cryppo genkey

./bin/cryppo encrypt -v "hello world" -k hC8qa7pXJwQBOSvd6R49Oriz9GdrSNRLJ_ghiKkLIfA=

./bin/cryppo decrypt -k hC8qa7pXJwQBOSvd6R49Oriz9GdrSNRLJ_ghiKkLIfA= -s Aes256Gcm.iS6qTA6TZTdp0WM=.QUAAAAAFaXYADAAAAADrfiFDhr6WX-8J2mkFYXQAEAAAAAB1WwXFl8_jhofWs2fiqyMSAmFkAAUAAABub25lAAA=

./bin/cryppo genkeypair -P pub.pem -p priv.pem

ENCRYPTED_BY_RSA=$( ./bin/cryppo encrypt -v "hello world" -P pub.pem )
echo $ENCRYPTED_BY_RSA

./bin/cryppo decrypt -p priv.pem -s $ENCRYPTED_BY_RSA

echo "data to sign" > file_to_sign.txt

./bin/cryppo sign signature.out file_to_sign.txt -p priv.pem

./bin/cryppo verify out signature.out -P pub.pem
cat out

rm priv.pem
rm pub.pem
rm signature.out
rm out
rm file_to_sign.txt
