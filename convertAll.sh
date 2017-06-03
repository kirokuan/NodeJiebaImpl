#!/bin/bash

for ((i=1;i<=52;i++))
do 
  #python ../filter_format.py $i filter3 filter2
  node convertPinyin.js $i pinyin 
done
