#Charity/Stock rating/category choice engine

The hypothesis is a subject will change their behavior when prompted to give to a charity or purhcase a stock if the choices are presented by rating rather then by category. 

The `Stock Charity` application provide an interface to setup a list of stocks and charities that are assigned random rankings. These stocks/charites can be displayed by grouped by their ranking or their category. The application tracks the subjects choices, clicks and timing.


These views are indeded to be embeded via an iFrame into Qualtrics, an online survey platform.

`qualtrics/stockcharity.js` contains all the code needed to embed these views into Qualtrics.


####[See an example of a category view of stocks](http://stockcharity-mktgit.rhcloud.com/category?itemtype=stock&uid=testsessionuid&sid=testsessionsid)

##Sample code to embed charities by category
 	
 	Qualtrics.SurveyEngine.addOnload(function() 	{ 
 		Wharton.Stockcharity.showChoices("category","charity", "{e://		Field/sid}", "${e://Field/uid}", "${e://Field/cid}", this 
 		); 
 	});
