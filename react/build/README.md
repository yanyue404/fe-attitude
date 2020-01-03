### Script 引入

```html
<script
  crossorigin
  src="https://unpkg.com/react@16/umd/react.production.min.js"
></script>
<script
  crossorigin
  src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
></script>
<script src="https://cdn.bootcss.com/babel-core/5.8.34/browser.min.js"></script>
```

### 模板

```html
<!DOCTYPE html>
<html>
  <head>
    <title>React</title>
    <script
      crossorigin
      src="https://unpkg.com/react@16/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"
    ></script>
    <script src="https://cdn.bootcss.com/babel-core/5.8.34/browser.min.js"></script>
  </head>
  <div id="root"></div>

  <body>
    <script type="text/babel">
      class MyComponent extends React.Component {}
      function Example() {}
      ReactDOM.render(<Example />, document.getElementById('root'));
    </script>
  </body>
</html>
```
