// add in whatever import statement here

export default {
  validateEmail: function(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  propIsEmpty: function(value) {
    return typeof(value) === 'undefined' || value.trim() === '';
  },
  parseISOString: function(string) {
    let b = string.split(/\D+/),
        newDate = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));

    return newDate.toLocaleString();

  },
  printGorilla: function() {

    console.log(`%c                 ,.-" "-.,
                /   ===   \\
               /  =======  \\
            __|  (o)   (0)  |__      
           / _|    .---.    |_ \\         
          | /.----/ O O \----.\ |       
           \/     |     |     \/        
           |                   |            
           |                   |           
           |                   |          
           _\   -.,_____,.-   /_         
       ,.-"  "-.,_________,.-"  "-.,
      /          |       |          \\  
     |           l.     .l           | 
     |            |     |            |
     l.           |     |           .l             
      |           l.   .l           | \\,     
      l.           |   |           .l   \\,    
       |           |   |           |      \\,  
       l.          |   |          .l        |
        |          |   |          |         |
        |          |---|          |         |
        |          |   |          |         |
        /"-.,__,.-"\\   /"-.,__,.-"\\"-.,_,.-"\\
       |            \\ /            |         |
       |             |             |         |
        \__|__|__|__/ \__|__|__|__/ \_|__|__/ 
              %s`, "font-family:monospace; color: #D232DA", "The Gorilla Gang");
  },
  getGETVariable: function(key) {
    let $_GET = {};
    
    if(document.location.toString().indexOf('?') !== -1) {
        let query = document.location
                     .toString()
                     // get the query string
                     .replace(/^.*?\?/, '')
                     // and remove any existing hash string (thanks, @vrijdenker)
                     .replace(/#.*$/, '')
                     .split('&');

        for(let i=0, l=query.length; i<l; i++) {
           let aux = decodeURIComponent(query[i]).split('=');
           $_GET[aux[0]] = aux[1];
        }
    }

    return $_GET[key];
  }
};