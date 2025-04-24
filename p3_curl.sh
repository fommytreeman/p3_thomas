#!/bin/bash

# Project Three: Curl
# Authors: Thomas Freeman & Emily Wilkie
# Date: 2025 April 24

# This script is used to test the API endpoints for the problems
# Make sure the server is running before executing this script

for i in {1..8}; do
    curl -X GET http://localhost:3000/problem$i
done
