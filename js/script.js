function show(par) {
            var modal = document.getElementById(par);
            var span = modal.getElementsByClassName("close")[0];
            modal.style.display = "block";
            
            span.onclick = function() {
                modal.style.display = "none";
            }
            
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }



