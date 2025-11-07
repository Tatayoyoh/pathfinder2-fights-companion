cd public

echo "Downloading conditions.json ..."
curl -s https://pf2e.pathfinder-fr.org/assets/data/conditions.json | jq -c > conditions.json

echo "Downloading creatures.json ..."
curl -s https://pf2e.pathfinder-fr.org/assets/data/creatures.json | jq -c > creatures.json

echo "Downloading equipment.json ..."
curl -s https://pf2e.pathfinder-fr.org/assets/data/equipment.json | jq -c > equipment.json

echo "Downloading gm-screen.json ..."
curl -s https://pf2e.pathfinder-fr.org/assets/data/gm-screen.json | jq -c > gm-screen.json