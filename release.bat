@echo off
setlocal enabledelayedexpansion

echo Current version info:
type version.json | findstr "version"

set /p new_version="Enter new version number (e.g. 1.0.1): "
set /p description="Enter release description: "

:: Edit JSON using powershell
powershell -Command "$json = Get-Content version.json | ConvertFrom-Json; $json.version = '%new_version%'; $json.description = '%description%'; $json | ConvertTo-Json -Depth 4 | Set-Content version.json"

echo Updated version.json.

git add version.json
git commit -m "Release version v%new_version%"
git tag "v%new_version%"

echo Created release commit and tag v%new_version%.
echo Run 'git push origin main --tags' to push to GitHub.
