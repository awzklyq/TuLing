#!/usr/bin/python
# -*- coding: UTF-8 -*-

import xml.sax

class MovieHandler( xml.sax.ContentHandler ):
	def __init__(self):
		self.DefineSprite = {}
		self.CurrentDefineSprite = {}
		self.CurrentPlaceObject2 = {}
		self.Symbol = []
		self.loadingPlaceObject2 = False

	def convertData(self, data):
		dict = {}
		names = data.getNames()
		for index in names:
			dict[index] = data[index]

		return dict

	def startElement(self, tag, attributes):
		self.CurrentData = tag
		if tag == "DefineSprite":
			self.CurrentDefineSprite = self.convertData(attributes)

		if tag == "PlaceObject2" and self.CurrentDefineSprite:
			if self.CurrentDefineSprite.has_key("PlaceObject2") == False:
				self.CurrentDefineSprite["PlaceObject2"] = {}
			self.CurrentPlaceObject2 = self.convertData(attributes)
			self.loadingPlaceObject2 = True

		if tag == "Matrix" and self.loadingPlaceObject2 == True and self.CurrentDefineSprite != None and self.CurrentDefineSprite.has_key('PlaceObject2'):
			self.CurrentPlaceObject2["Matrix"] = self.convertData(attributes)
			
		if tag == "Translate" and self.loadingPlaceObject2 == True and self.CurrentDefineSprite != None and self.CurrentDefineSprite.has_key("PlaceObject2") and self.CurrentPlaceObject2.has_key("Matrix"):
			self.CurrentPlaceObject2["Matrix"]["Translate"] = self.convertData(attributes)

		if tag == "Scale" and self.loadingPlaceObject2 == True and self.CurrentDefineSprite != None and self.CurrentDefineSprite.has_key("PlaceObject2") and self.CurrentPlaceObject2.has_key("Matrix"):
			self.CurrentPlaceObject2["Matrix"]["Scale"] = self.convertData(attributes)

		if tag == "Rotate" and self.loadingPlaceObject2 == True and self.CurrentDefineSprite != None and self.CurrentDefineSprite.has_key("PlaceObject2") and self.CurrentPlaceObject2.has_key("Matrix"):
			self.CurrentPlaceObject2["Matrix"]["Rotate"] = self.convertData(attributes)

		if tag == "Symbol":
			self.Symbol.append(attributes)
			print("Symbol Name :", self.Symbol[len(self.Symbol) - 1]["Name"])

	def endElement(self, tag):
		if tag == "PlaceObject2":
			self.CurrentDefineSprite["PlaceObject2"][id(self.CurrentPlaceObject2)] = self.CurrentPlaceObject2
			self.loadingPlaceObject2 = False
		if tag == "DefineSprite" and self.CurrentDefineSprite.has_key("PlaceObject2"):
			self.DefineSprite[id(self.CurrentDefineSprite)] = self.CurrentDefineSprite

   # def characters(self, content):
		# print(content)

	def printf(self, datas):
		for element in datas:
			print("aaaaaaaaaa", element, datas[element])
			# if isinstance(datas[element], (list, tuple, dict)):
				# print("aaaaaaaaaa", element, datas[element],id(datas[element]))
				# self.printf(datas[element])
			# else:
				# print(element, datas[element])
	# def startDocument(self):
	def endDocument(self):
		self.printf(self.DefineSprite)
  
if ( __name__ == "__main__"):
   
	# 创建一个 XMLReader
	parser = xml.sax.make_parser()
	# turn off namepsaces
	parser.setFeature(xml.sax.handler.feature_namespaces, 0)

	# 重写 ContextHandler
	Handler = MovieHandler()
	parser.setContentHandler( Handler )

	parser.parse("test.xml")