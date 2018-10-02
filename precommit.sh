#!/bin/bash
# run chmod +x .git/hooks/pre-commit
TAGS=()
for f in $(find . -name '*.md' -mindepth 0 -maxdepth 10 -type f) ;
do
	while read line
  do
    echo $line;
    if [[ $line =~ (tags: )(\[(.*)\]) ]];
      then
        for i in ${BASH_REMATCH[2]//,/ }
        do
          tag=${i//\'};
          tag=${tag/[};
          tag=${tag/]};

          if ! [[ ${TAGS[*]} =~ ${tag} ]]
            then
              # echo "not contains: ${tag}";
              TAGS+=(${tag});
          fi
        done
    fi
  done < "$f"
done

mkdir -p tags

for tag in "${TAGS[@]}"
do
echo "---
title: ${tag}
description: \"Here are all the posts that related to ${tag}\"
layout: tag
permalink: /tags/${tag}/
---" > tags/${tag}.md;
  echo "created: ${tag}";
done

echo 'done';

git add -- ./tags
# print array
# printf '%s\n' "${TAGS[@]}"
# exit 1;
