window.onload = function()
{
	function $(classname)
	{
		return document.getElementsByClassName(classname)[0];
	}

	function currencyElem()
	{
			this.ccy = 0;
			this.bid = 0;
			this.offer = 0;
			this.time = 0;	
	}

	currencyElem.prototype.spread = function (offer, bid)
	{
		var dif = (parseFloat(offer) - parseFloat(bid)).toFixed(5);
		if (offer.indexOf('.') == 3)
			return (dif*100).toFixed(1);
		if (offer.indexOf('.') == 2)
			return (dif*1000).toFixed(1);
		else
			return (dif*10000).toFixed(1);
	}

	currencyElem.prototype.getTime = function (time)
	{
		var date = new Date(time.slice(0,-3)*1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		var milisec = time.slice(time.length - 3);
		var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ':' + milisec;
		return formattedTime;
	}

	var arrayOfObjects = [];
	for (var i = 0; i < 10; i++)
		arrayOfObjects.push(new currencyElem);

	var globalUpdate = 0;

	(function()
	{
		var widget = document.createElement('div');
		widget.className = "widget-container";
		document.querySelector('body').appendChild(widget);

		var div = document.createElement('div');
		div.style.width = "100%";
		div.style.height = "23px";
		div.style.display = "flex";

		var innerdiv = document.createElement('div');
		innerdiv.style.height = "22px";
		innerdiv.style.outlineWidth = "thin";
		innerdiv.style.outlineColor = "grey";
		innerdiv.style.outlineStyle = "solid";
		innerdiv.style.fontSize = "20px";
		innerdiv.style.textAlign = "center";


		for (var i = 0; i < 10; i++)
		{
			var dupNode = div.cloneNode(true);
			dupNode.className = 'mainblock';
			$('widget-container').appendChild(dupNode);
			for (var j = 0; j < 3; j++)
			{
				if (j == 1)
				{
					createNodes(dupNode, 'one4two1', 2, 3);
					continue ;
				}
				if (j == 2)
				{
					createNodes(dupNode, 'one4two2', 4, 5);
					continue ;
				}
				var innerDupNode = innerdiv.cloneNode(true);
				innerDupNode.className = 'inner' + (j + 1);
				dupNode.appendChild(innerDupNode);
			}
		}

		function createNodes(dupNode, class_name, num1, num2)
		{
			var one4two = document.createElement('div');
			one4two.className = class_name;
			one4two.style.display = "flex";
			var innerDupNode = innerdiv.cloneNode(true);
			var innerDupNode2 = innerdiv.cloneNode(true);
			innerDupNode.className = 'inner' + num1;
			innerDupNode2.className = 'inner' + num2;
			one4two.append(innerDupNode);
			one4two.append(innerDupNode2);
			dupNode.appendChild(one4two);

			var innerDupNode3 = innerdiv.cloneNode(true);
			var innerDupNode4 = innerdiv.cloneNode(true);
			innerDupNode3.className = 'inner' + num1;
			innerDupNode4.className = 'inner' + num2;
			dupNode.appendChild(innerDupNode3);
			dupNode.appendChild(innerDupNode4);
		}

			getInfo();
	})();


	setInterval(getInfo, 1000);

	function getInfo()
	{
		var xht = new XMLHttpRequest();
		xht.open("POST", "parsingpage.php", true);
		xht.onreadystatechange = function() 
		{
	 		if (this.readyState == 4 && this.status == 200) 
	 		{
	 			var obj = JSON.parse(xht.responseText);
	 			showInfo(obj, arrayOfObjects);
	 		}
	 	}
		xht.send();
	}

	function changeBid(innerBlock, k, index, objArray)
	{
		if (+innerBlock.childNodes[k].innerHTML < +objArray[index].bid)
			innerBlock.childNodes[k].style.backgroundColor = 'green';
		else if (+innerBlock.childNodes[k].innerHTML > +objArray[index].bid)
			innerBlock.childNodes[k].style.backgroundColor = 'red';
		else 
			innerBlock.childNodes[k].style.backgroundColor = 'white';
		if (+innerBlock.childNodes[k].innerHTML != +objArray[index].bid)
			innerBlock.childNodes[k].innerHTML = objArray[index].bid;
	}

	function changeBid(innerBlock, k, index, objArray)
	{
		if (+innerBlock.childNodes[k].innerHTML < +objArray[index].bid && globalUpdate)
			innerBlock.childNodes[k].style.backgroundColor = 'green';
		else if (+innerBlock.childNodes[k].innerHTML > +objArray[index].bid && globalUpdate)
			innerBlock.childNodes[k].style.backgroundColor = 'red';
		else 
			innerBlock.childNodes[k].style.backgroundColor = 'white';
		if (+innerBlock.childNodes[k].innerHTML != +objArray[index].bid)
			innerBlock.childNodes[k].innerHTML = objArray[index].bid;
	}

	function changeOffer(innerBlock, k, index, objArray)
	{
		if (+innerBlock.childNodes[k].innerHTML < +objArray[index].offer && globalUpdate)
			innerBlock.childNodes[k].style.backgroundColor = 'green';
		else if (+innerBlock.childNodes[k].innerHTML > +objArray[index].offer && globalUpdate)
			innerBlock.childNodes[k].style.backgroundColor = 'red';
		else 
			innerBlock.childNodes[k].style.backgroundColor = 'white';
		if (+innerBlock.childNodes[k].innerHTML != +objArray[index].offer)
			innerBlock.childNodes[k].innerHTML = objArray[index].offer;
	}

	function showInfo(obj, objArray)
	{
		var index = -1;
		var count;
		var count2;
		var spread;
		var innerBlock;
		var innerBlock2;

		for (var i = 0; i < 10; i++)
		{
			objArray[i].ccy = obj[i][0];
			objArray[i].bid = obj[i][2] + obj[i][3];
			objArray[i].offer = obj[i][4] + obj[i][5];
			objArray[i].time = obj[i][1];
		}

		for (var i = 0; i < $('widget-container').childNodes.length; i++)
		{
			count = 0;
			innerBlock = $('widget-container').childNodes[i];
			if (innerBlock.nodeType == 1)
			{
				index++; 
				for (var j = 0; j < innerBlock.childNodes.length; j++)
				{
					innerBlock2 = innerBlock.childNodes[j];
					if (innerBlock2.nodeType == 1)
					{
						count++;
						switch(count)
						{
							case 1:
    							innerBlock.childNodes[j].innerHTML = objArray[index].ccy;
    						break;
    						case 2:
    							count2 = 0;
    							for (var k = 0; k < innerBlock2.childNodes.length; k++)
    							{
    								count2++;
    								if (innerBlock2.childNodes[k].nodeType == 1)
    								{
    									if (count2 == 1)
				    						changeBid(innerBlock2, k, index, objArray);
    									if (count2 == 2)
			    							changeOffer(innerBlock2, k, index, objArray);
    								}
    							}
    							break;
    						case 3:
								changeBid(innerBlock, j, index, objArray);
    							break;
    						case 4:
							    changeOffer(innerBlock, j, index, objArray);
    							break;
    						case 5:
    							count2 = 0;
    							for (var k = 0; k < innerBlock2.childNodes.length; k++)
    							{
    								count2++;
    								if (innerBlock2.childNodes[k].nodeType == 1)
    								{
    									if (count2 == 1)
    									{
			    							spread = +objArray[index].spread(objArray[index].offer, objArray[index].bid);
				    						if (+innerBlock2.childNodes[k].innerHTML != spread)
				    							innerBlock2.childNodes[k].innerHTML = spread;
    									}
    									if (count2 == 2)
			    							innerBlock2.childNodes[k].innerHTML = objArray[index].getTime(objArray[index].time);
    								}
    							}
    							break;
    						case 6:
    							spread = +objArray[index].spread(objArray[index].offer, objArray[index].bid);
				    			if (+innerBlock.childNodes[j].innerHTML != spread)
				    				innerBlock.childNodes[j].innerHTML = spread;
				    			break;
				    		case 7:
				    			innerBlock.childNodes[j].innerHTML = objArray[index].getTime(objArray[index].time);
				    			break;
						}
					}
				}
			}
		}
		globalUpdate++;
	}
}
