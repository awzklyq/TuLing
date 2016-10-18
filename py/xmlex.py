#!/usr/bin/python
# -*- coding: UTF-8 -*-

import xml.sax

class MovieHandler( xml.sax.ContentHandler ):
	def __init__(self):
		self.CurrentData = ""
		self.type = ""
		self.format = ""
		self.year = ""
		self.rating = ""
		self.stars = ""
		self.description = ""
		self.DefineSprite = []
		self.Symbol = []

	def startElement(self, tag, attributes):
		self.CurrentData = tag
		if tag == "DefineSprite":
			self.DefineSprite.append(attributes)
			print("DefineSprite Id :", self.DefineSprite[len(self.DefineSprite) - 1]["Id"])
			print("DefineSprite FrameCount :", self.DefineSprite[len(self.DefineSprite) - 1]["FrameCount"])

		if tag == "Symbol":
			self.Symbol.append(attributes)
			print("Symbol Name :", self.Symbol[len(self.Symbol) - 1]["Name"])

	# def endElement(self, tag):
		# if tag == "DefineSprite":

   # def characters(self, content):
		# print(content)

	# def startDocument(self):
	# def endDocument(self):
  
if ( __name__ == "__main__"):
   
	# 创建一个 XMLReader
	parser = xml.sax.make_parser()
	# turn off namepsaces
	parser.setFeature(xml.sax.handler.feature_namespaces, 0)

	# 重写 ContextHandler
	Handler = MovieHandler()
	parser.setContentHandler( Handler )

	parser.parse("test.xml")