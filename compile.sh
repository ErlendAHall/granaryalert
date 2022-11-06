bundledName="granaryalert.js"
compiledName="granaryalert"
root="/granary/edev/granaryalert/"
executingDirectory="/usr/local/bin/granaryalert/"

echo "Bundling project."
# Bundle to a single source.
deno bundle $root/src/main.js $root/$bundledName

echo "Compiling executable."
# Compile into a single executable to simplify the running as a systemd service.
deno compile --allow-read --allow-net $bundledName $compiledName

# Set permissions and move it executing location.
echo "Setting permissions."
sudo mkdir -p $executingDirectory
sudo chown root:root $root/$compiledName
sudo chmod 700 $root/$compiledName

echo "Moving to executing directory"
sudo cp $root/$compiledName $executingDirectory/$compiledName


echo "All done, cleaning up."
sudo rm $compiledName $bundledName

echo "Starting up"
sudo systemctl restart granaryalert.service
sleep 2s
sudo systemctl status granaryalert.service