const html = `
  <html lang="en">
  <head>
    <title>Sandbox</title>
    <style>body {background-color: white}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
        window.addEventListener(
          "message",
          (event) => {
            try{
              eval(event.data)
            } catch (error) {
              document.getElementById("root").innerHTML =
                '<div style="color: red;"><h3>Runtime Error</h3>' + error + '</div>';
              console.error(error);
            }
          },
          false
        );
      </script>
  </body>
  </html>
  `;

export default html;
