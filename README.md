To run the app locally:

1) Clone to local computer (recommend using github desktop app)
2) In the root folder of the app, run "yarn install" to install necessary packages.
3) Start the flask server in a separate terminal with "yarn start-api"
4) View the front-end with "yarn start" (in a separate terminal from the flask server). If you haven't already - run "yarn install" to download front-end packages.
5) To check if it's working, make a change in src/App.js and check if it renders!


Flask Environment Set Up:

1) Navigate to api folder in terminal.
2) Run "python3 -m venv venv" to create a local virtual environment. This will track packages used.
3) Run "source venv/bin/activate" to start environment.
4) Install the following packages (run in command line):
      a) pip install flask
      b) pip install pymongo
      c) pip install dnspython
      d) pip install python-dotenv
      
      
Deployment:

If you are not able to access the EC2 instance where the app is already deployed skip this paragraph:

You will need admin access to account number: 190665123755 on AWS. The application is deployed on an EC2 instance that you can start and stop. If you decide to stop it, when restarting, you will need to allocate the new server IP address to the deployed route (using route53). The deployed route is currently at https://www.getannetta.com. Please see EC2 deployment documentation in shared Annetta folder for my robust instructions on deploying from scratch.

If you are able to ssh into the EC2 instance, all you need to do is run ./build.sh whenever you update the master branch.

Recommended Development Methodology:

When working on a new feature, make a branch from development, test on chrome, safari, and firefox while working. Minimize react warnings, and do not push if there are any errors in console or from react. When finished and tested, merge the branch with development. If the feature is large, request a review from a teammate. Try and follow established js/css practices present in the application.



