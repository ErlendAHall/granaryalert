compiledName="granaryalert.js"
root="/granary/edev/granaryalert/src"

# Bundle to a single source.
deno bundle $root/main.js $root/$compiledName


# Set permissions and move it executing location
echo "setting permissions"
sudo mkdir -p /usr/local/bin/granaryalert
sudo chown root:root $root/$compiledName
sudo chmod 700 $root/$compiledName
sudo mv $root/$compiledName /usr/local/bin/granaryalert/