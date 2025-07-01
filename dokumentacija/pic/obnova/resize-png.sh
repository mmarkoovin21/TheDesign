#!/usr/bin/env bash
set -euo pipefail

# Niz širina koje želiš generirati
widths=(400 800 1200)

# Opcionalno: stvori output folder
mkdir -p resized

# Prođi kroz sve PNG fajlove u trenutnom direktoriju
for src in *.png; do
  # Izvuci bazni naziv bez ekstenzije
  name="${src%.*}"
  for w in "${widths[@]}"; do
    # Generiraj novu sliku width px širine, istog formata
    magick "$src" -resize "${w}" "resized/${name}-${w}.png"
    echo "Created resized/${name}-${w}.png"
  done
done
