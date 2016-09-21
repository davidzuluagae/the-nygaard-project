// Blog_Article.js

'use strict'
var mongoose = require('mongoose');
// var hash = require('../Server/hash');

var Article_Schema = mongoose.Schema({
    company : String,
    // LIST OF CATEGORIES THAT THIS ARTICLE CAN RELATE TO
        categories : String,
    
    publishDate: String,
    // Metatags
        keywords: Array,
    author : String,
    summary: String,
    link_prev_article : String,

    // Blog Article TITLE LISTING  
        title  : String,
    // blog content
        content: Array,
    /////////////////////////////////
    /// SERVER-SIDE DEFINES    
        endpoint : String,
        headerImage: String,    // Main Image should be one that gets shared on social networks..
        extraImages: Array, 
        // array of Amazon ASIN #'s
            relatedProducts: Array,
        // past and affiliate blogs
            relatedArticles: Array,

    // EXTRA IMAGES AND VIDEOS
        extraYoutubeVideos: Array,


});

Article_Schema.statics.findBy_blog_title = function(param1, callback) {
    console.log("FETCHING blog_title : "+param1);
    // this.find({author : "brent linhardt"}, function(data){
    //     callback(data);
    // })

    return this.find({ title: param1 }, callback);
};



//-=== 
// let checkWrite_newBlog_promise = function(){
//     return new Promise(function(resolve, reject){
//         console.log(" --> Started Checking If This New Blog is Ok To Publish : " + connectionCount);
//             if (true) {
//                 resolve(connectionCount);
//             } else {
//                 console.log(" FAILED TO GET CONNECTION COUNT  to MongoDB connectionCount");
//                 reject( /* reason */ );
//             }
//     });
// };
Article_Schema.methods.confirmNewBlogIsOKtoWrite = function(callback){
    console.log("Checking that this New Blog is OK to Write..");
    console.log( this.company +" : "+this.title);

    console.log("CHECKING FOR MATCHING TITLE NAME");
    this.model('Blog_Article').find({ title: this.title }, function(err,data){
        if(err){
             console.log(err); 
        }else{
            if(data.length >=1){
                console.log("FOUND MATCHING TITLES FOR THIS NEW BLOG..");
                callback({success: false, msg: "Blog Title Already Exists"});
            }else{
                callback({success: true, msg: "OK to Write this Blog"});
            }
        }
    });

};


//// ### EXPORT THE MODEL
let Blog_Article = mongoose.model("Blog_Article", Article_Schema);
module.exports = Blog_Article;