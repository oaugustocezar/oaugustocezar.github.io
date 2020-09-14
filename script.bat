@echo off
echo "Script para realizar commits no github"
set /p commitMessage=O que voce esta commitando?
pause
git status
git add ./
pause
git commit -m "%commitMessage%"
git push origin master