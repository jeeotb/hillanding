#!/bin/bash
echo "Đang tự động tải code lên Github..."
git add .
git commit -m "Cập nhật lúc $(date +'%Y-%m-%d %H:%M:%S')"
git push origin main
echo "Hoàn tất tải lên!"
