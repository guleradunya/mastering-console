cd /home/user/mastering-console/Filmler/arsimet
for spec in "src-6 1" "src-7 1" "src-7 4" "src-9 1" "src-14 4"; do set -- $spec
  for i in 1 2 3 4; do
    if python3 tools/asset_search.py fetch --results research/$1/results.json --pick $2 --dest assets/archive > logs/refetch-$1-$2.log 2>&1 && ! grep -q "429" logs/refetch-$1-$2.log; then echo "OK $1 $2"; break; fi
    echo "retry $1 $2 ($i)"; sleep 75
  done; sleep 45
done
echo DONE
