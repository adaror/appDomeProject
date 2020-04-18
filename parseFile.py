from argparse import ArgumentParser
from json import dumps
parser = ArgumentParser(description="App parser")
parser.add_argument("--file", help="The app to parse")
filename = parser.parse_args().file
file = open(filename, "r")
contents = file.read().split(" ")
print(dumps({ "platform": contents[0], "react": contents[1] == "react" }))