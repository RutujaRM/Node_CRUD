
const API_Key = 'AzYfGJI389546001832QIirt'   //Create API Key Manually

const checkAPI_Key = (req,res,next) =>
    {
        const apiKey = req.headers['x-api-key'];   //X-api-key is api format we pass inside header

        if(!apiKey)
            {
                return res.status(401).json({error: 'API Key is Required !!'});
            }
        else if(apiKey !== API_Key)   //here header pass key is match with store API Key
            {
                return res.status(401).json({error:'Invalid API Key'});
            }  
          
        next();    //pass control to the next middleware function 
    };
    
    module.exports = checkAPI_Key;   //Export this method 
