#!/bin/bash

# Extract current version
if [ -f version.json ]; then
  current_version=$(grep -Eo '"version": "[^"]*"' version.json | cut -d'"' -f4)
  echo "Current version is: $current_version"
else
  echo "version.json not found!"
  exit 1
fi

read -p "Enter new version number (e.g. 1.0.1): " new_version
read -p "Enter release description: " description

# Update version and description in version.json
sed -i '' "s/\"version\": \".*\"/\"version\": \"$new_version\"/" version.json
sed -i '' "s/\"description\": \".*\"/\"description\": \"$description\"/" version.json

echo "Updated version.json to $new_version"

git add version.json
git commit -m "Release version v$new_version"
git tag "v$new_version"

echo "Created release commit and tag v$new_version."
echo "Run 'git push origin main --tags' to push to GitHub."
