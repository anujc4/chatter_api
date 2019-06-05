echo "
 ██████╗██╗  ██╗ █████╗ ████████╗████████╗███████╗██████╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
██║     ███████║███████║   ██║      ██║   █████╗  ██████╔╝
██║     ██╔══██║██╔══██║   ██║      ██║   ██╔══╝  ██╔══██╗
╚██████╗██║  ██║██║  ██║   ██║      ██║   ███████╗██║  ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

"
echo "Building backend dependencies"
cd chatter_backend && npm i

cd ..

echo "Building frontend dependencies"
cd chatter_frontend && npm i

echo "Your'e all set. Just run npm run backend to start api and npm run frontend to start frontend."