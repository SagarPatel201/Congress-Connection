# Scrape Engine

Congress Connection's scrape engine is a collection of python scripts to scrape information from both websites and public APIs to update its database. These scripts are run automatically at 11:59 pm every day to ensure our data is accurate on any given day.  

## Usage 

We utilize Anaconda for a virtual environment for dependency management to store sensitive information such as API keys and database login information as environment variables. To activate the conda environment on the virtual machine, simply run conda activate scrape\_env and run the python scripts like normal. 
