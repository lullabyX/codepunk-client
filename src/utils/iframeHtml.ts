const html = `
  <html lang="en">
  <head>
    <title>Sandbox</title>
    <style>body {background-color: white}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
        const errorHandler = (error) => {
          document.getElementById("root").innerHTML =
          '<div style="color: red;"><h3>Runtime Error</h3>' + error + '</div>';
          console.error(error);
        }
        window.addEventListener("error", (event) => {
          event.preventDefault();
          errorHandler(event.error)
        })
        window.addEventListener(
          "message",
          (event) => {
            try{
              if(event.data.error) {
                errorHandler(event.data.error);
                return;
              }
              eval(event.data.code)
            } catch (error) {
              errorHandler(error)
            }
          },
          false
        );
      </script>
  </body>
  </html>
  `;

export default html;
