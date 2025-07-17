#!/bin/bash

SOURCE_DIR="$(dirname "$(realpath "$0")")"
cd "$SOURCE_DIR" || exit 1

DESKTOP_WIDTH=1920
MOBILE_WIDTH=768

mkdir -p "desktop" "mobile"

EXTENSIONS=("png" "webp" "avif")

for ext in "${EXTENSIONS[@]}"; do
  find . -maxdepth 1 -type f -iname "*.${ext}" | while read -r img; do
    [ -f "$img" ] || continue

    filename=$(basename "$img")
    name="${filename%.*}"

    echo "Obrađujem: $filename"

    if [[ "$ext" == "avif" ]]; then
      # Pretvori .avif u privremeni .png
      avifdec "$img" "/tmp/${name}_tmp.png"

      # Resize u desktop i mobile PNG verzije
      convert "/tmp/${name}_tmp.png" -resize "${DESKTOP_WIDTH}>" "desktop/${name}.png"
      convert "/tmp/${name}_tmp.png" -resize "${MOBILE_WIDTH}>" "mobile/${name}.png"

      # Očisti privremenu sliku
      rm "/tmp/${name}_tmp.png"

    else
      # Resize za PNG i WEBP direktno
      convert "$img" -resize "${DESKTOP_WIDTH}>" "desktop/${name}.${ext}"
      convert "$img" -resize "${MOBILE_WIDTH}>" "mobile/${name}.${ext}"
    fi
  done
done

echo "Gotovo!"
