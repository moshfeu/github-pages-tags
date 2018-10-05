import { file } from 'find';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { exec } from 'child_process';

const tagsDir = './tags';
const template = `---
title: {{tag}}
description: "Here are all the posts that related to {{tag}}"
layout: tag
permalink: /tags/{{tag}}/
---
`;

interface IFile {
  path: string;
  content: string;
  tags?: string[];
}

getMdFiles().
  then(readFiles).
  then(exrtactTags).
  then(createTagsFiles).
  then(runGitAdd).
  then(status => console.log('done 👍', status)).
  catch(err => console.log(`didn't work 😭 :( with`, err));

function getMdFiles(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    file(/^((?!node_modules).)*\.md$/, '.', files => {
      resolve(files);
    }).error(function(err) {
      reject(err);
    });
  })
}

function readFiles(files: string[]): IFile[] {
  return files.map(filePath => ({
    path: filePath,
    content: readFileSync(filePath, {encoding: 'utf-8'})
  }));
}

function exrtactTagsFromFile(file: IFile): string[] {
  const meta = /---(.*)---/gs.exec(file.content);
  if (meta && meta.length) {
    const tagsLine = /tags: (.*)/.exec(meta[0]);

    if (tagsLine && tagsLine.length > 1) {
      return JSON.parse(tagsLine[1].replace(/\'/g, '"')) as string[];
    }
  }

  return [];
}

function exrtactTags(filesWithContent: IFile[]): string[] {
  return filesWithContent.reduce((tags: string[], file: IFile) => {
    tags.push(
      ...exrtactTagsFromFile(file).filter(tag => tags.indexOf(tag) === -1)
    );
    return tags;
  }, []);
}

function createTagsFiles(tags: string[]): boolean {
  if (!tags.length) {
    return false
  }
  createTagsFolder();
  tags.forEach(tag => {
    console.log(`creating "${tag}"`);
    writeFileSync(`${tagsDir}/${tag}.md`, template.replace(/\{\{tag\}\}/g, tag));
  });

  return true;
}

function createTagsFolder(): void {
  if (!existsSync(tagsDir)) {
    mkdirSync(tagsDir);
  }
}

function runGitAdd(tagsCreated: boolean): Promise<any> {
  if (!tagsCreated) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    exec('git add -- ./tags', (err, stdout, stderr) => {
      if (err || stderr) {
        reject(err || stderr);
      } else {
        resolve(stdout);
      }
    });
  })
}