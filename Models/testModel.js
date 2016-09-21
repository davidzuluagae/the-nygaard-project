// testModel.js

'use strict'
let model2test = 'Blog_Article.js';
let config = require("../Config/config");

let mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    mongoose.connect( config.db );


//-  IMPORT MONGOOSE MODEL
let  thisModel  = require("./"+model2test);

let newArticle = new thisModel({
	author : 'Brent Linhardt',
    publishDate: '06082016',
    
    endpoint : "Investors_Contact_Us",

    // Blog Article TITLE LISTING  
    title  : "Are you missing out on the next big investment opportunity?",
    // Quick synopsis of blog
    socialDescr: "When Francois discovered roaches living in the Keurig, I about freaked out!!!",
    
    headerImage: 'https://s3.amazonaws.com/astirio/AstirIO_Site/img/Carousel/2.jpg',
    extraImages: [
        'https: //s3.amazonaws.com/astirio/AstirIO_Site/img/Carousel/2.jpg',
    ],

    // Metatags
    keywords: [
        'Coffee Maker',
        'Mini K-Cups',
        'Hot Coffee',
        'Coffee Hot',
    ],

    // for internal blog categories
    categories: [
        'Home Appliances',
        'Product Testing',
        'Francois',
    ],

    // past and affiliate blogs
    relatedArticles: [
        "<a href='https://wiki.astir.io/index.php/Keurig_Bugs'>Keurig Bugs</a>",
        "<a href='https://wiki.astir.io/index.php'>Poisoning the Keurig</a>",
    ],


    // array of Amazon ASIN #'s
    relatedProducts: [
        "0679805273",
        "1501129740",
        "1338099132",
        "0679805273",
        "1501129740",
    ],

    // blog content
    paragraphs: [
        'So there I am watching the new viral videos {at our service} of the day on my computer when I see my roommate, Francois, trying to wedge himself through the door carrying our beloved Keurig Brewing System and a screwdriver.',
        '“Ahh… What are you doing?” I nervously ask.',
        '“I think there might be bugs inside the Keurig.” He casually responds.',
        'I shake my head. Francois has a mechanical background. He must know what he’s doing I thought.',
        'I go back to watching a video of',
        '<iframe class="dropShadow" width="640" height="360" src="https://www.youtube.com/embed/Lq_kw16vPDI" frameborder="0" allowfullscreen></iframe>',
        "After a few moments I see Francois has successfully removed the cover of the pod bin for the Keurig. What’s a pod bin you ask? It’s the part that holds the pod. Maybe you’re unfamiliar with the Keurig Brewing System. Maybe you don’t know what the pod is. Maybe you don’t care. Well if you don’t care. Don’t read the next sentence. The pod is the container that holds the water. So Francois removes the cover for the pod bin and I quickly picked up my <a target='_black ' href='https://www.amazon.com/gp/product/B01F48QLFA/ref=as_li_tl?ie=UTF8&tag=astirio-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=B01F48QLFA&linkId=cb643ab56e29a982717cb261dd287855'>Samsung Galaxy S5</a> and started recording. After all, who doesn’t want to see what the inside of a Keurig looks like? Well, here you go. A terribly filmed video of the inside of a Keurig Brewing System. Don’t ask me what those parts are. I have no earthly idea.",
        'So I go back to my computer and hop on Facebook. After a few moments, I hear some snapping noises. You know? The sound plastic makes when it is being damaged. I grab the camera and focus back on Francois\' handiwork. He is prying apart the top of the machine with the screwdriver. I immediately realized I was wrong about Francois knowing what he was doing as soon as he broke the plastic brackets holding the plastic rim on the top of the Keurig Brewing System.',

    ],
    IgnoredParam : "Will Not Be Written",
});


// Create a New Record..
let saveBlog_Article_Promise = newArticle.save();
	saveBlog_Article_Promise.then(function(newRecord){
		  // if (err) return console.error(err);
		  	console.log(" --> Wrote MongoDB Record");
            console.log(newRecord.title);
		}).catch(function(exception){
			console.log("  ERROR --> ");
			console.log(exception);
		});
		// console.log(Object.keys(saveBlog_Article_Promise));




// mongoose.connection.close();