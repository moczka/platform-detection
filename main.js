window.addEventListener('load', onWindowLoad, false);


function onWindowLoad(){
    initApp()
}

function initApp(){
    var platformHolder = document.getElementById('platformHolder'); 
    var preLoadHolder = document.getElementById('preload');
    
    console.log(preLoadHolder);
    
    var userAgent = {mobile:false,platform:"", portrait:false};
    var platformImage = new Image();
    var landScape = new Image();
    
    var itemsToLoad = 1;
    var itemsLoaded = 0;
    
    getUserAgentInfo();
    
    
function getUserAgentInfo(){
		
		userAgent.platform = navigator.platform;
		
		if(userAgent.platform != "Win32" && userAgent.platform != "MacIntel"){
			userAgent.mobile = true;
			window.addEventListener('resize', onOrientationChange, false);
			if(window.innerHeight>= window.innerWidth){
				userAgent.portrait = true;
			}
		}
    
        addImage();
    

	}
    
    
function addImage(){
    
    switch(userAgent.platform){
        case 'Win32':
            platformImage.src = 'assets/sprites/windows_os.png';
            platformImage.addEventListener('load', onAssetLoad, false);
            break;
        case 'MacIntel':
            platformImage.src = 'assets/sprites/mac_os.png';
            platformImage.addEventListener('load', onAssetLoad, false);
            break;
            
        default:
            
            itemsToLoad = 2;
            
            platformImage.src = 'assets/sprites/mobile.png';
            landScape.src = 'assets/sprites/mobile_landscape.png';
            
            platformImage.addEventListener('load', onAssetLoad, false);
            landScape.addEventListener('load', onAssetLoad, false);
            
            break;
    }
}
            
function onAssetLoad(e){
   var target = e.target;
        
    itemsLoaded++;
    target.removeEventListener('load', onAssetLoad, false);
    
    if(itemsLoaded == itemsToLoad){
       preLoadHolder.setAttribute('style', 'display: none;');
       platformHolder.setAttribute('style', 'display: block;');
       platformHolder.appendChild(platformImage);    
    }
}




function onOrientationChange(){
    
    if(window.innerHeight>= window.innerWidth){
			userAgent.portrait = true;
            platformHolder.replaceChild(landScape, platformImage);
    }else if(window.innerHeight<=window.innerWidth){
			userAgent.portrait = false;
            platformHolder.replaceChild(platformImage, landScape);
    }
    
}      
            
            
            
            
            
    //end of app        
    
    
}

