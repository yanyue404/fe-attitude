# [bestof.js.org](https://bestof.js.org/)

### [2016 年崛起的 JS 项目](https://risingstars.js.org/2016/zh)

### [2017 年 JavaScript 明星项目 ](https://risingstars.js.org/2017/zh)

* querySelector

```
<input type="checkbox" value="">

  <ul class="box">
    <li class="gap">1</li>
    <li class="gap">2</li>
    <li class="gap">3</li>
  </ul>
</body>
<script>
  document.querySelector('input[type="checkbox"]').setAttribute('checked', 'true');
  document.querySelector(".gap:last-child").style.color = "orange"

  // document.querySelector(" .list-content:last-child .gap").style.height = "5em"
</script>
```

* 闭包作用域

```
<button onclick="delayedAlert();">Show an alert box after two seconds</button>
<p></p>
<button onclick="clearAlert();">Cancel alert before it happens</button>

<body>

  <script>

    function delayedAlert() {
      var timeoutID1 = window.setTimeout(slowAlert, 2000);
     timeoutID2 = window.setTimeout(slowAlert, 2000);
    }

    function slowAlert() {
      alert('That was really slow!');
    }

    function clearAlert() {
       window.clearTimeout(timeoutID1);// timeoutID1 is not defined
      window.clearTimeout(timeoutID2);
    }

  </script>
```
