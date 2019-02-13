// ==UserScript==
// @name         WME Open Other Maps
// @namespace    https://greasyfork.org/users/30701-justins83-waze
// @version      2019.02.13.01
// @description  Links for opening external resources at the WME location and WME from external resources
// @author       JustinS83
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com*
// @exclude      https://www.waze.com/user/editor*
// @include      https://www.google.com/maps*
// @include      *wv511.org/*
// @include      http://www.511virginia.org/mobile/?menu_id=incidents
// @include      https://mdotjboss.state.mi.us/MiDrive/map*
// @include      http://pkk5.rosreestr.ru*
// @include      /https?:\/\/www\.511pa\.com\/Traffic\.aspx.*/
// @include      http://newengland511.org*
// @include      https://www.mdottraffic.com*
// @include      http://www.511nj.org/trafficmap*
// @include      http://nmroads.com/mapIndex.html*
// @include      https://gis.transportation.wv.gov/measures*
// @include      https://www.mapwv.gov/flood/map*
// @include      https://roadworks.org/*
// @exclude      https://www.waze.com/*/user/editor*
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @require      https://greasyfork.org/scripts/13097-proj4js/code/Proj4js.js
// @grant        none
// @contributionURL https://github.com/WazeDev/Thank-The-Authors
// ==/UserScript==

(function() {
    'use strict';
    //var jqUI_CssSrc = GM_getResourceText("jqUI_CSS");
    //GM_addStyle(jqUI_CssSrc);

    var settings = {};
    var wazerIcon = "data:image/png;base64,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";
    var gmapsIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHiSURBVDhPY/hPCPx+9eLjtg3vVy/9evr4vz9/IIIEtL1fteSev9NdbzsIepwV/+v5U6A4SNvR59fW3TuGic5uXATXAEePMuOAdjIA9SguScKKtsS5AdXd8bZbbGEw0Uj7mLMFRCfQtQxr7h4FqnDZWLX37tmTD68m7emHazsX5AhUdMbVqkFXHYjmmulBtH3YsBqq7fD9i+6baoxW5VmuLVJemgLRtiPWFajotpfdbDO9TgPNA07mEG1fjh+Garv45Lby0uTp5zfffP4gaFsLRFtRXRBEHTJ6EBv07+dPqLbe02tWXt3fdHzJqYfXNJdnAEW0liUeOe39KM0eTdvnQ3tBIQnRBkRROzvzD0w3WJUL0XP0nPffO87fDrveQYqAJ211oGhB1gZHcD1/brtdOTX7XE8bRM+tMK9bFy9g1wbX8/d+4M9PV06dOnXowIGbMYFAbWcn9d68eROLNrien7fc3r+9CpT+8eMHUOe5vo7bIR6H9+/Dog1ZT9v8udnTzr799BOi89zO7VeKsw8dOoSuDU1PYMtRIELo/P798uL56Nqw6kHXCXYtQtu2+4dx6YEgZJ0PHz6Eavv7+QAePRAE1wkHDP///fr3du7RM1smbbqNB605+vgfVMv/////AwB1kYZCu5TA6gAAAABJRU5ErkJggg==";
    var mapillaryIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABGdBTUEAALGPC/xhBQAAAatJREFUOE+tlFtLAkEUx/er9CEyA+sbRM9BH8EuWhL0oC8h9B7dFAIXoqe8RGgP9RDkipoSZkJpeQk1N8swldW108ywa3uZLKKFH7sz/3P+c2Z2Zhj8GPzmEYN3jh31mkvoLSDgBwQplsW5XyaHZl4T+HtwLjZDDVYnSiyGt8CdCVE1DSwjlUgTIViMQafXhekTB1WXwR64IuqaTASs0BQ60O9/wHEhqtM1CNiIJoCNcxGTJJ8DUezD7Nk6NU5GZ2RCldgiLsi8FCHXKIPJb4HHJg/h6o0qTsvACC9ssBBD02mTSrLIZCXiJtpqdA8SfBbGfQuqZCUDI1cmCO2uQEyunu9JZcpAe8wD5+UUjCn6lKimNhWyQyDPQU8UofxeBwdKljVLeJsMIlephbrYM6dOMnqqngdH3ANWbof0x2u38PBWpU6RaiSDE7AhruSydgcXlTT5diYPdLFDjWSWuV30ByvEBPPUasBkYEkVg41+c0hJdWuJfai2XonZZvpIqQtDjwgNvOM3rv1QQnvLKK2VfES+PbTDMPrmlW32/66RwZ2EXKVp/uFiY5hPR2AhGcMUotsAAAAASUVORK5CYII=";
    var terraIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAACSUlEQVQ4T6XUzW/SYBwHcLLEg8aTmVdv/gV6EJ6Wlj6FQV0NFhEQeRMGpmgW0BnjxlB8O0iixpdMmS5ZiB58iWMzvmRZFjfRbOyw+HryoIlZYjyRqLvsZwvPRGIHbH6T76F52s/T9tdU10qy2Wx7NBqVyOH/RRCE/YwRLXAdLIiiOOl0OreQpdUlHo9vt9lscwf26eHjOIKjU3fBcrwPDAiVWZZNFgqFDeTUxpFleaPJZDpjxmjpzhUEv95TsPiBgp7XD8A5PQv2eyPAuD1A0/S8JElGcpl2XEqU3b8mDhrgy8sqtNxlsNKpGbBlLwHCGDDGuXA4vIkQtQSDQZfQoYdnw6gO0gRJpacTwHXFQHnPbwlTSyAQCF49q42p1QLVikN5FfxEmFqagYdu9EHnwC2Qxp7XgZ0Dg2sDAx496PXVMi4PiLfzVfD6zdWDP5RJx2QEgpsC6x4ENGOowJbefth5+Vrr4Lc3NIy+MMG5xxj6R/k/TY3wELvAAi+iyt02BX8qnXzFwqmxGqLV1CMedofpxmD5HQXDE5wmoNXQSWZl8OJpBLnx1jG1K4J+v3+XzY6WErnWwWN5DIILgcPhmCFMfbxer8Vs5j/vPUzDifv1g/i76lACKUaZNlpECHUXi8X1hNBMm9VqzdB4R7nrPPsPlhjkwGJXPiFBmM1kMtvINc2j/Em28jw/rT7SkSEOeh9icHcbgaKp75FIpCedTreRU1tPqVRa5/P5ZCNDL7BmAyibPAmFQpvJ8tqTTCbblfeLyWGD6HS/AREwNmot2NXWAAAAAElFTkSuQmCC";
    var wikimapiaIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAACeklEQVQ4T5VUTWgTQRRebf2v9Te0m5nNJjuzaRuxl4LoQUMPCnoRKcWjUD14K+LFm+LFS6ngD57Eo6AXEdGDQsSDilQP2oOK6EHSmN2djaFYawrZfm+yYlpCbB88mJ33vW++997sGM0WDQ2tUzyzN2DynOJOwWeiGnL5OA6vzD5LuUFxcSVgohhwWQfZHL5fY30xhvzf6pxvUklxHyQ1xcQfkNzw2IAbSNkd2fbGGNbeYiWT8FrAxdfAkkciw1gbOs62kGUHg153IIa2txJ394HAC5gzD5LDRFJhYhj9eQplPxSTD2Joe1OWe5l6goTrROJx9xDKm1FcRuQgexJD2xuAb6mxZUuKes/gFqh7pIlXTyTmAZ6inlSZ4+L7y1+SVRHpBCae+7v6tipL7EHTvzcTIaagsNDsZStNA1kTsMxIY885QYpCnPrpZyq1Y6Y3bWP9YQnRMkd8zmPOURIRWnJC7yezJw3dEyYXAhMT0zdbXMXewnKCfy6mvFS/GeXznRjQRyierfT0pUEkx+BRyMUrmlrRzO4G+EUrEhz4m66GLivpnkIepi0elhO5LqOUymZQ3nsNZuJS0TQ3R7nc+pDJCwC+RPI0FL7Dvbrt29l+kHRgPYw9HwfOhpY4TsQGqQB4xGdOlQKKOdcC7jJ96k7ZTWtSeQ8E0ehoBzBncOA3UgMBN0u4MnpqZAUj30nMANCPWvOTooxbPhFa7kH8g1bjRXDGEX9DzW6UKe6WE4mumGKpAbQfgGeQ7en6m/rTcPFLt8GSZ6dRfpzW2iq2vR0qDoDoNBInMZk7IL6F9XmUfSw0nZTuyUqNelfHy0BPDD0lVH4camGGsQj+znJFw2F9rQAAAABJRU5ErkJggg==";
    var bingIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAB70lEQVQ4T62TOUtDURCFn/uuiCIIojYWKhZi7y+w8S9obS1iYmJcUQIuQSsRQWy10SJErFxQ0UKwECxMXELAECMhhMQc51xzJS/kaaEXJu/lzcx3z70zYwD4F1M/1dPTqJqaAp8lTieKHA7UyHv295/MBKKVTU6id20NfevrKBZgZQZSlfFbmQlUK2aMj8N1dIREKoWt62s0zs2hwuXKm5xtJlDdzAwMmw02n48OROJxtLvdSiWP+dMRyTAryoDS6TQCkQhaFhfVfXGTWjGdmAs1gbQi++EhHQi8vaFzZQVN8/MosNthiFXKMRmXq5AMS5BfFPV4PDi4u8Pm1RUGtrfRIHfGGFaWORpGhiUo+P6O+tlZuI+P1X+um2AQy6en6F5dRanAdIvIsga9RKNoXlhAlySd+P2IJRLqO9eExLDCzPkV9CygNqmaMTqKjqUlXD49qbZIfnyoFlGgfIpyq/Ygd8TyD+/t4TYUQkoAaolvaHdXxTInvyLZhbKZ9BqL4TwQYND3unh8xODODsqlepZV04rGvF46TOs+HMbI/v7XZtIG1RlI3qrROA68YJuoCouieDIJz9kZWnlXsgn7SDempSLtKJeRYBIHt39jQyngmOgKMS4bQjOBdBCfTOL0F8p4UIHu5FyAtm/Q3w3GJ+jeRjZzKMG3AAAAAElFTkSuQmCC";
    var osmIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAEAUlEQVQ4T32Ue0xTVwDGL1vYw7kty+YykJAtY2FuIYASgyzBGTNn1Lm4ZE83idPJssUZ1i0ukT8U2YZBNGGMAUJb2tIHUAqUR73lJX15y20F2gJFkL54tLS08hLd49tpQaPZ40u+nD/O+X73O+eee6m+kORldlZmMfqkDYxHnMWy5eus3u4X7MGeA9qpBq50+MKQyFZQr/cKs/qnBU9c8ys3WgOqT2yBDvlwsKuUul/GWWkvAcE4Wo0+b+3KUIgG42uG2iWBYqwMSmsp5L0S0IxmpdvUBxXThTptNWx+tQ9A1BqGgHySE4xXAsbKg8EhgNmnADMjR5uDB4GhBDqrBd6l25hdvoPpxRW452/BOhOErFMBs1v5yhqGimpiS9OZGQn0k0LoBypxdUoMk68eV8ZroDYZI+GwJxdW7bp5C8P+RZinQ/iprOLkGoeiWJfy4EioE9bAZQxOtcDkrkWXswpc9a+RYIA08RMHV34nrW5jIrSMfu98xA0ao3sNQ1GWuTaxNajCoL8Vg7MtMAxXQ2j7mYAkcJBQuEF4dNxcxo3gMgZ9C/dA2jEPUlMzYimAihoINHuII2dzzS5Dnb0Ichsfks4W2AOLkXDYo3NLBLIKuGvd+CSSk9M3Urxu3mOGyZpl44wMrEsKZkyILlcV6AkxqhrrMUCCQ/4FWO5rcdcj5CEqAzudkJDwaHhn0fRIBW2YroHeTt7amACmmWbQTikq6ppQLKz9B2CAeDy4BDfZ6qlzRXnx8UnPREB8+myefkoE/XU+dKN8GJw0cS+qlT3YtWc/uI3tD0DCZ+WYW4CovfGPdz98+8XY2FefDYOiCkWc93QeATQuPrpZEQwWGU4XfIuiH49h74G9+Or7wxC0i9FqNEBlNpGxE0KVFHIND+crc/cnJiY+GQZR3TbZp+wUaeFug8ZZh29ys/HWzl3Yt2c7fhOVkrtUhdreYojpQkhVhbioOoXyjrNQmiV/fnxs3zaCeDgC6vP0CLvccjCTCnx98gu8mbkD6ekZ+JJzCJfJp6EbUqP/uhysvQ5X+rmoYM/gkvkMyrR5dhJ/LgIhekg1XuPQORTIzvkcGelvIC1tK45zskBrfkHvjWZoJzpw1UVgPiUUoyWo7M8D15KP8/R3fJJfbXPw+O6nmmy80JETn/21ZXMaklNSwcnPhtp+CS10iVPSU8honTWLOmc7GE8r5MMXwbXmo9x0ev4H/pHDEciaooleF5YcZTenbLqTtm1rHyf/qPCdj3Z8QOZeIn5+w4anU3IvZOdUKouk5wQ5xe9zdmetX//Ia2RuXRhwT3FxcY9nZm45tHN7SsGmpKTMmJiYBxesKvy7iCZe3cp/KQyLT4pcrP9f+K+iqL8B4XkGClAVarkAAAAASUVORK5CYII=";
    var yandexIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAABa0lEQVQ4T62TPc8BQRSF/SdfER8FFZH4ASoSnYpCIkGCjoRGpaHS04iWUqHS+0hQoxPHnR12dnauxvtu8uTOPfecm9lN1gPgX2HFv8CKGpsNMJkAg4Gs6zXJjO8NK1qcz0CzCaTTQCQC+P2yJpNS5zIEK1rUakAgAHi9JkLvdMhm5gzBYrmUtxFhcbNMBshmZQ0GpR6LwfK5slpjUyqp24jX2++BxwM4HIB2W82Ez5XVGptEQoUuF5Icz+mkZsLnymqNTTSqQvc7SY7ndlMzgSurNTaFggqMx3LJ8wlcr8BopGa5HNn1rNbYzGZAKCRDolYqQLcLlMtAOKwWDodk17Nao1EsqiCH+H7bLVn1nNYY5POAz8cvbLXIYmYMwWCxAOp1IJVSy+JxYLWisek3hK/0empho0ES4yFYkeWzUPxBxyNJjIdgRZbPwumUWmb+hhVZ+n2gWqUjM3PAiizzObDb0ZGZOWDF34HnBbQcm5EIFazJAAAAAElFTkSuQmCC";
    var hereIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAB0klEQVQ4T62RSy9DURSF+69U79XWq9p6NDEgMRAxEI1XQjqQGBATP8AjaElJKxGPlqLCmDAyEI8IpYKqViJ+wLLPuXo5vSclavDl7L3W2evs5JgA/CtSsRikYjFIxWIwCGvrG1iLbFIp6oyd+B4dRv07QrOyGkFpWQ3hQHRjiyRNj25uw+FuhFmt5l5f/6Du5SM03X0+KHYXVIKd8d19kmFivZmCzIoWqNhc8HYPcC8fg+Dt6ofF6oTF5kSFw4NO6tlmJUoVGhpbeG2x1vA7zMufF5oc7HU2wLYxq9pGg0MjSKfTCIWXea/a6VG609Xro5GvWSHoOzyUtrRV1vGA4dExkjUvEo19hrp4aGu7V/eEkHy00K/B9UiMZM1jn5b7wPGpWV0XAmR0UKhSXouycjffNrYVJ1nzVlajmA+G9J6hF4UY6PFBpVDV7ubnwuISyfK7erH4lIQ/dY/Awy38j3cIMO4TmMs+IZy4wow/iIkpP2dyOkAjxjCGXsSeH+C6O4fn7RF1qRviGp73FOpvTnH0mqErxmEZQnOcSaMpecFDaom25CUuXrNkiUOFMAgHLyk03J6hOXGG0+zvN8shFQ8p9CTzQqXR+wmpWAxS8e/A9AGMrnKfuSpKAAAAAABJRU5ErkJggg==";
    var midriveIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QsdDy4g/1qyDQAAA1JJREFUOMt1lH9oVnUUxj/n+saS/lhSkBNKKJL+yCAiaQNtP2KBLgyMChuIe0P/qEgsMymzbNnmyKgIjLUpLDShpKJgQriEBhKD0IxCAyMhoyhyi7Xe+z3n6Y/37nU/6gvn3vu9nOe55/uc5x5rebSvif9fGRFnRwa3/9rS1QOIkcEdtJR7F4HdCgTw18jAM6daynu7gIcAAT+UQKM1Gs2gNEAC0zctXT0dI4PP/gTQ0rVnMdJRjMYi8xywDMVyzNqrGJaWiJhTpKoXYRKYsVziQHP51TUCJ9gv1Giq4f4AkGIS4QXFeEkKTEIGJhA2CjoPdGJGFa9WkvYaXJTZWiRUPVJxNGBqaidmL05XVyKcwGTimGBY8qNm1g38I1FXqOKCTUAdClBBahQywxeHd0dtA5QkATEmRfnE0Es/N2/sziLysikbBjYCh2T2iaS7gcdBqwQlapzVxqzs3PUAqKPgPV8KOcCdwIWVnS8Me6WyW8bpL9/bdRg43LT++frM7Fqhr0x0mWWHMOY5SYpGYEOx/baky83LgNXAakKDTet3bDGyVzDaJd0IXBFwAPl1VJs6y0QKpemuA3nJw+e7V2wA+13oEUwDkrYZ9hRm/ZZpYbheAzpnQrzKWzNWofE85gUSW0BNiOOGvS40cPL9nglgYsWD23+zOYiI2TyZh+PuuCfcE8kTyQMPfy653+wRYyeP9Gz92338jnVPFyR+IoUzHQApEikKjkiU3H2OCgIY//rDfX23r9vab7I9AKc+6KuVlIe/a9gvwOKaFB7UrA1kKYL/iI8AkseVleRjMz+8/P4tL0eod3Li0vXJ/VxeNN8lkl/mKKWiYrPqaCjW6SqxfwdWD/x5U8dmFl11NWNHendOJ91y3xNnkJYUuczs1yxXzHg/VeyHUuRDQHNlEqYWTM2SLfdkVmDy5DN/PLLcndydSnEvnpcAfP/pWxc8dHDpvZu7Lxx/hzMfv0HDPWUAbmjf9HCefG2lsEMlEhWPWmR5cvIU5MnJowhPrQDL1jzG+eH9Bz38UkNbeVtDW7nu4ucDXLNqo6WIJ1OEJU8G4Mnrqu5ykvvCUpo3NgFY0dBWbj372dvHq6DYR2a3Af0NbeU3gXpJd80ZtqNAfTHufvwXtm8nDnLoEBMAAAAASUVORK5CYII=";
    var NYFCIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAADL0lEQVQ4T2VUSUtjQRDObRzw7kSdgyKiiCIo7stBPMw4MyB4M4mDB8E/oF48eBJUPImIDqIgiOKCJ3HfsrgkuB4EBb0paojGLC8Jz5rva19EZxrqdb+q+r6upbtN/w4R+QKxQIZ1XXdrmuaDPGLtgW4EYn15eUk23P8fMH6C0/doNDp9c3Nzd3x87He73ZrdbtcpBwcHGnW0hcPhOfj/gH+CAX8dV1dXCVBaYLT7fL7gxcWFnJycCIBydHSkhP+np6dCG3xC8HUAY/tAhp9vANknJiai/f390tPT8ya9vb3S19enhGvquB4dHY3t7+87ga2LkyR7vd7ptra2SHFxseTk5EhBQYEUFhZKSUmJVFVVSXV1tZSVlSldfn6+ZGdnS2Njo2xubkaBn0V0KSSyoAZ39fX1kpeXp8ClpaUKSMKMjAxJS0uTrKwsKSoqUmQVFRXS0dGhUkeaDyCymtCN4fn5ef/g4KAMDAzI0NAQw1Zr7pqZmanImpqa3uxjY2OyvLwsaADJArFYbMQUDAbdq6ur2u7urng8HlVY7jQ5OalSSk9Pl5qaGsFmynZ4eCiojSALRba0tKSFQiG36enpybeysqJDZGNjQ/b29mRmZkYaGhokKSlJpdXd3a2A29vbgk1lbW1N+XJeX1/X/X6/z4TPI5Q6FGqnra0t6ezsVCnl5uZKc3OzIiARbSiwEuqIIRGCeWRqHkSj0ciwWQcW3Gw2q4IzJZfLpYD0iZPx34hKIweLPQJWP0kIslgskpqaqtrc1dWl6razs/MmJIjPJMLMYv/h1bBeX1/fcZfW1lZ1RtglpuRwOATXRJxOp4qKM3WcScYGXV5eesFhI9FXnKU5FDhSWVkpiYmJUltbK+Pj43J2dqZqQ/B74aZsCq5LNBAILJAjfrrrAHC0tLTEysvLpb29XTkyfNaEM8HxTpHs/Pw89vz87AL2pyLhwA8vrQ2hOqempkKLi4sqJXaFYJLEC8wUEUkY3SbJb0Tz2aB5HcYLwKdh9v7+/oEnFic3gnroiEAHcYS629vbBzw1C/D7Bfn4jLwf2MEMBytEPWx4e3yQ9w+bDT4phrsxTKa/NeZmq7YI4fAAAAAASUVORK5CYII=";
    var rosreestrIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAABy0lEQVQ4T2PABdbvPy+w//R1h+v3nzvsP3/d4fz1+w7r9592gEoTD05evLG/b+rc/8Xldf93HDjxv6656//ClZv+3338sgGqhDC4dOvetcTU7P/Wdq7/za0c/2/ZdeC/pY3zfztHj/8tnf2/rtx+6AdVihvsO3lhVUpm4X8zSwc4BhkEYzs4e/2fv3z9//X7zwRAtWAHdU0dq2zs3XAaBMJpWYX/dxy78B+qBRPcfvLSqrii7gfIO8gat+5GNcjBxev/6cu3cBt0/PJth92HT4E1IuNDZ6+h8LfsOvj/4LkbuA26//y1Q15xJYrtIAzSjMz3C4r8f/zCTXIMOojCb2zr/r/lwHFNqDZMgMugbXsQBgWFxfxv6ZoQCtWCHYAMyi+uQjEEhHfsPfzf2y/0f2Vty/+d+49cvfX4sQxUC3ZwGBjY567f+3/55n0UfOLK3f8nL936v+Xwhf/3778XgCrHDbC5yMs35P/p6w/fz15/mPh8hs2gvkkzgAY9Ji2zohsUFpXwv6OjH3fs4AIggwpKq8H5KTYx439Ley/+2MEFjgPLnC17Dv9fvXnX/43b94Y+fvMGf+zgAmfO/Ge9deuZ6DkghgoRCRgYAAGFe4VDwIAnAAAAAElFTkSuQmCC";
    var PA511Icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACClBMVEX//vz//vv8+/r4+Pj7+vn9/Pr///709vfn6u7U2+Td4ei/ydmotc/r7fBziLHHz92+x9qsuc/y9Pf////29/fX2+b9/f7+/v79/v18j7Q9WZPO1eH//v7n6u3+///AydpbcaG5xNfO1eS2wdiyvtavu9TFzt7m6e6/x9j///3p7fDDzdu+yNkML3kaPIDk6PD5+fktSokWOYBMZpxBXZeDlLbd4us6V5EkRYTY3uhFYJUYPH/7/PtziLMzUpKRo8Pi5u0QNYA1VJOTo8Wgrsjv8/aRpMEAH25je6mltc0CKXU4V5O4w9Zddqdrgq3R1uQaPIE8WpROap8AJXJofqzGzt0AJnOFmb73+foWO4BIZJnd4u1Rap9cdKbK0d6Aj7Xr7vH8/vwZPYRHYZuotc0AJHWntM8CJ3NyiLDM1OJacqNfeKiTpMEAHnC0v9avutIAI3N6jrKYqMcAHm7Aydumss0AG22frsqKnb5feKZxhbDl6e5FYJYpSYgnSIlAXJjl6fCClLgdP4Lh5OqOn8AbPYLV3ebs7/NlfKpOaJy9x9r+/vzr7fPt7/Tz9Pbx8/b09/b29/h9kLRMZ5p/k7jZ3+l6j7ZOZ5uNn775+/v//v35+vrJ0d/t8PPu8fXd4uqvu9OMnb1Sa6F5j7XCzN78/fzQ1+K9x9m1wNaksc6aqMart8/X3ef+//0JSeH9AAAAAWJLR0QTDLtclgAAAAd0SU1FB+IDCA8HAr9f8sAAAAD7SURBVBjTY2BgYGBkZGJmZGFlgAA2dg5OLm4eXj5+AUEhYWFhBhFRTjFxYWEJYTZJKWlhYRkGWWEokBMWlldQFGZgU1JWUVUTVtfQ1NLW0dXTZzAwNDI2MTUzt7C0sraxtbNncHB0cnZxdXP38PTyFvbx9WPwDwgMCg4JDQuPiIwSjo6JZYiLT0hMSk5JTeNMzxDOzMpmyMnNyy8oLCouKS0rF66orGKorqmtq29obGpuaW1r7+jsYmDr7ullE+7rl5gQMXHS5CnCDJowhwlPnTZ9xkxhhlnCs+eYzZ03f8HCRYuXgPwyi23psuUrVq5aLb9mLRsQAP2OCgBLzD+TNb5HDAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wMy0wOFQxNTowNzowMi0wNTowMAebKzMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDMtMDhUMTU6MDc6MDItMDU6MDB2xpOPAAAAAElFTkSuQmCC";
    var Miss511Icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAABjUlEQVQ4T2MYWsClYXM+Q/CcEoZAVGxfvakkpHWbKFQZflA272iXXOqyXwxBs/+jY8eaTf+jenfpQpXiBpuP356uV7j6B1PwHAxDQNivdfv/7BkHCBtkULTmElvYXKyGgHDipL3/21eexm/Q2iM3luHyEgwXzz3yf96u6/gNOnLlwQ6zsnX/JRKX4MT9G8/9P3DxEX6Dbj58saNvw7n/dUtP4sRHrzz8/+jFW/wGXbr7bEf+nMP/I3v34MY9u9yhynGDG0AX1S498T91yv7/KVhwzsxD/4vmHcRv0K2HL90qFx2/IZm05D9H+DysWClj+X+jojX4DVp96MZMy4oN/3GlHxCWSVn6Xy+fgEEJk/bOlAYqxGYADIvEL/qvkLEUv0Hz91yd2bP+7P+GZSf/1y87AcfiwCiHGcQdOf+/YOxC/AbtPnOXf9mus1JzNqBihfTlcIOYQ+b8Zw6bh98gXGD2jkv/PZu2/m9ddfp/84pT/6sWHiXPoFWrVjGHhq5iBtEgzPD/PyNUCgoYGACx+Fztt2VvAQAAAABJRU5ErkJggg==";
    var LAFCIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAYAAADQWvz5AAABgWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKM+Vkc8rRFEUxz/MiBhRLCiLScPKyI8SG2WkoSZNY5TBZuZ5b0bNjNd7T5Ktsp2ixMavBX8BW2WtFJGShZU1sUHPeZ6aSc3Cvd1zPvd77zndcy5UxrNKzvT2QC5vGbFwyD+TmPVXP+HBRzNeWpOKqY9EoxHKjvdbKhx/HXRy8b9Rt6CaClTUCA8rumEJjwtHVizd4S3hZiWTXBA+Ee4y5IHCN46ecvnZ4bTLnw4b8dio1NYo7E+XcKqElYyRE5bKCeSyy8rve5xKfGp+ekp8u6w2TGKECeFngjFGGaCXIbEDBOmjW3aUie/5iZ9kSWIVsTqrGCySJoNFl6jLkl0Vr4muysyy6vT/b19Nrb/Pze4LQdWjbb92QPUmfBVs++PAtr8OwfMA5/li/NI+DL6JXihqgT1oWIfTi6KW2oazDWi515NG8kfyyKrUNHg5hvoENF1B7Zzbs99zju4gviZfdQk7u9Ap9xvmvwH7o2e1G6/3lQAAAAlwSFlzAAALEgAACxIB0t1+/AAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xOdTWsmQAAAJJSURBVDhPlZRPSBRRHMfX3Zm34+JCFFoKHqIuHTxnoVSUUJAX0xWL3Cz6Y6ZphZm5TMm6amnrzJt/C3rpWl4K6iDU0Q5CaAYRdQhvarf+0AZO3zd/lhl3GegLX2YO3+9n3r73exviCLkHf208cnReVrUVWdXf3R2+/0ZS1AXm0fTYa04Q5iLR6PFQkBB4AtC3vv6BTarqJvPk42nrySxR1dxVVfWRi0ZvOJXSihBi7K6uXsxKtFDuvdlfeGduOnnqE0DziIftVglhRTNn2to/eIsp8YEPdL23bxMf1BHn7FYJCRUVjSnxYd5bzEw88oHGxifz8Xj8oFMpLdM0y6iqffEWL1256gPBEqJldiNACE55i8mui4V3WdH+SIaxz4kGi1KjDqW/bnng9h0PSF8SRbGwN2bQyrLZ7A6UfrllnxVtDasampGVoZ2VlRfY3OGARuFMKBbb4yBsUU07jdKWWx7Zdmqu6w83rGIM8rAJ4DqqxCY4wldfuGE2Ty1tiSIIc8f5zh9YyWcLxICC0OAgbCH0yg2zqW5NtBdBmDEmJsrvHRDzS9QjNgXCHVt1w+nMhJnoOFsEYWbXpaa2dtmB/AwLQpLn+ToLoijKfsyRgeAUTuj58Ejq97nOJCt+lzV9ml1kL+zYiaYN7M8Gg+FnLnPl5fUWaLuam1v3dvf03MK/wGAul4tROltDVeMZTs46jMvXurcAWsCVWcRzDhX/hgfJmn6qdgG2lM6Mz2I1TwkhBwAahN+GeT7hRP9bAsyzF2z+oQghLf8AAjyYhRxw+xIAAAAASUVORK5CYII=";
    var RoadworksIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAACFElEQVQ4T7VTzYtpcRieLOxY2tiIzZQFykJkIkRGoixEkjSlCFkoSzv+AhulLKxmp2wpKWY7avYsuMpH+dio+9zzvhzjXuY2d3Gfejq/834853nfc87DfwGAGxJ+CqDrYrHYrdfrHxz8G+4J7fd7zGYz9Pt9zOdzDAYDHA4HIfX5oBuISZGbzYZFGo0GhsMhptMpWq2WkPqsucF1krjb7TAej1GtVtFutzGZTPD6+opKpSKkvym0XC7x/v6OYrHIjSTU6/X4XC6XsVqthLJvCBEjkQgKhQKP8vb2hmQyiVKpxGNe192AgtRACIVCyOVySKVS3ExOstkswuEwut0ubfq+COGcRL1eRyAQwMvLC2q1Go+RSCSQz+fh8/moRKw9d/6B0WhERXh6emI3NArto9lsIh6PI5PJwOVyUcl9ITFIC6ZvxWKx8EjpdJqdOZ1OPpNDk8kklH7hRkwcj0d24Pf72YHBYOBv6OPjAzqdDtFoFGazmd+g2EO84CrI1skFLVuj0bAQUa1WIxgMwuPxcP6Mr4VUKhW8Xi+en5/5SmO53W4miRDlcjmEX4/KL72/CVGSiux2OxwOB7uzWq3QarW8NxKj+OPjI2KxmNDCuBWiHUmlUt4DCRDpTM20LzFGD5JIJCRCOIkQ6IZIjmQyGWw224UKhQLb7RadTgdKpfLiVq/Xw2g0spKAkyvx8K8UcbrHwy9Ba5ZwWKd5ZwAAAABJRU5ErkJggg==";
    //var NJ511Icon = "";
    var NM511Icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAACg0lEQVQ4T6WTX0iTURjGF10k3QVO56CLQPKmDBUMUbEyDYUwXSOFlQqCf6AIIyhRWtIwRBGCJPVCqzUyNrzKNGem3yRJpvvC5qbml6bln/VtTTedzvdp06+CZGDrB4fznvc87wPnPeeI9gIg3y+EwUPzjck0WdAgLIMDXEoIfa1XkPXKMzDHDwnpfwNAKFlzMmn6qo4m8nVkjGoRtvbGB40mvFcuVzIymXKmuWiQ7yoy/xjIN6+8STSaKio1/nxvWVmpIA+MsbY2eioiAjZJOFZLJPCOFGHLfBPe/mzwcaFYCgvDYFbWW0EeGL8RJ5VivToGWJv1nRDY9G6ByDe4J+CTxOhNO6cU5H8gonD/DK41hNjEDMfr9NKFi2IQz8Lp8mCBd2N81g7rDA+Hcw2eV9dga481kim+hSzZZ/y1vyG+I5mW2xX0+ZbOM35D71LLoHrO4tFLC0obh1D1dBTlLe8x882B9SkGdl1KOxlEMnonyiHGN+bqDu8YWfMqyHJJTZZcrddcqHe35uGuhkV9x0dcrmNQ2GDYNhyfsoE3MXB0Ksw0fV1Hs1WVxN3OIffkjpEfzN85SOzJBxsjSTpXUzoswywu3OvDC4bDxBc7+kbn0GmYhrvtPha0ijYyHDhNXHmMUL6b7WZHSOGUncX64iJca5uwOXy98Wxio78Hy5FS9KSl7W723/y6NbtEAvuxKLgfVsP9uAmrykIsRR7BnFiM7tTUvRlN+N7RWELC/HBsNOvsPu+wd2WMrRjkDpNK1cAUFyuZmppTgjwwAyqVeCA3l/mk18f71zR6QkvWAjWxcdptQbDQ985M36dV01LzUSEVPDRZohbC/wMQ7RPCAIhEPwGmF45ZgI9RNAAAAABJRU5ErkJggg==";
    var WVFloodIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAACvElEQVQ4T42T3W/SUBTA+88oDCjQUr636OY+oGtH+Sg4YLBNmPsQaEtpESWbiQ/G/8DsxT27aNziXLI5xxKzrYx9RxPjHoxPJkYTE2OicvEy0Omi0eT3dHN+59xz7rmI1sXp3LyW5LXujM6VQd0cSnL6XkFP1THQ2QZGWsRo4SdNDe3lUZJHXRm9mzOQvIEWrX6pLSzjXtlURyL8sonJmb0ShGByiI7k6g5M6cnhjGRiZMKbt7Ly3Ky8W+I7orIjlC/enpq8VRCmblgY0XIsIzAaa6ZsYgvKCw8EsGMFW9jB6khgNPflRT/YsR2uTZjotMUrQhDoNGjcxxHMP5nnwLYFKCpItWJ4Xer7WiFqivpwOWZwjRB+iQjkm1q9jg86culRurptrimqmnK2yaa6jqI+WB7QdV8ifDlzQG5oEuzKGcw9e5wC22ZY5MQ5QX2wFNG0x7E+3sSICErxeoq3s+L64jiowDqnon+wqXq7TncGhzCKM1I8Ah1nUCwvjVYrpuOIP5aC2llQ1r/ZiFODPEbzCO4RpmduvlM8f7nbb3za6rw3W3R4U4gBbgOZXrk/DMr/1FSvnobOOFm0O4kYaNgbt/pwBJThuE7FnUJ1tBZWn49gvRNQg4vHl+YuV5X/0SIt7VGcSiPGPhHz5ErzY0BpgeP6dSSgTuOkgRpqmo4BjE4h0IGPtrJY/LgbAHvnQFlXd8oasGP/vEdV97trW3jDARX8aGNc2zVI+HioiTgjtrE84YolM8nNheS3lwPPV4eLkwk7GWFiQzPTo+/3Yh/243fvJMlQVN+TIHwCQvgkSyBvYSWzTzB7OZwaM3bF0M640Z0gPFesfp7wpIyuYbQjrLkQRXsSJk/a7BcQW7BgZfO2YN4eKthDV+E3sbEixBmSW/uvtYavt4YLjouy1Z+1BrIWVjQHsoRf+A79jNM0D/QKqgAAAABJRU5ErkJggg==";
    var GMDMIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAINSURBVDhPnZPfS1NhGMcf6A8QgpIVpczN82vKCCyoLvpxWdRutMn5uTGhvJEoiIl0kxeDLOqiKBqSsKCrrIyCJhGlIl14IavAMFs4IU3BmIUz9+054w3GcKF94L047/t8v+f7Puc5VBVZ95Bih0ixukhxoiQ7+8TJJtCcTvLpX8lrgBrcZYJ2t6+SbKZI7vCIqipoVjf5LHiOX8SlW4MYHn+P/icjOBS7CpKjIMmaoGZjp6iuQLWDVNe+5j8Rx0xuHuX8LhYRS6RAfhukmNeFogLF6CPJwY1HI3g9vYJnk9+R/rCIpZVCySRfKMB/qgdU3zZHgXCtUJXREE5vP3oBw5lZJMe+4Vo6i97nMxiaXCgZ/FoDTncnQXtD66TpLUJVhi/8quZwF95+nMXSz3VkcnlcfjqNHl73x+fwYuoHQvF7oLpqBrJ50+347cE3pTe6vPuyjP6xHB5OLCC7mId0Ms4JwvMkRXcJVRmqtZ/8erH2yHmMZj4Li78UEe0dAPm4iaqVFIoN0OyE2+mag504m3iAgaFR9KVeosW4wmKeh0b7E8/JHlG9Aa2t29jkMckRvmsbd/yM23WQVwfvL/OXOiAq/0EwsoM0c4qaYm5cFjqgAA+RauuiYhOozjFq1AsU4CTNHWxi3BEnW0Ax71LwnJsgW0q1ZSS7nqOv8jXiYuc/0Ph3bop4xVMFRH8AgigQaceEwpQAAAAASUVORK5CYII=";
    var PennDOTIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQXRFWHREZXNjcmlwdGlvbgBjaHJvbWUKNi8xMy8yMDE4ICwgOTowMTo1NCBBTQpPbmUgTWFwIC0gR29vZ2xlIENocm9tZYnkUN8AAANFSURBVDhPpZPfb5NVGMd74YXxTh3grf+CXbuhkHUrqXZZMWgEg8lUYFXSICPbiEw0c0F0vwoUN+THZlZr0ETmiIYpdOuK7WCsQFiHrLRAu7qBLf2xMsYce/14+p4u0Wsvnve85znP8/l+z/Pm1eRyOf5vaPKPIrODolcccq2wU7Sug6LKQzJXeZiV5oOsqmjlGdMhnjD1oCl3saryKJtsO+k/aZCQFTXf8Ow2JytrXDz51gmequ5mhdWl5p6zOnl6qwvN6yfRbPqZ599zUmPfjvuSjnj8Bb78caOEVHWMYLGPYG6/gP6TYUqbvFS2+7Ec8GNsuYa2aQLTvn7sfbsJ3TbAYz3hmBnrVy5e/HhAQtY7rqlhOnCVdW0BEZcpa5ukwh7F2v0r33tsxOJr1Oa5bCldZ/aztiXMtqPfEYwYJcTs+J2XHdfZcOQGrx6JYu76g3e6/biG6rj/52q1OR8TEQtbenxov0jSOdAsgCXwl05CNvfG2Nh7l6oTs9R8G6J3uI3pGWF7Uac2P8rq6R9txHIsw4bjdxm8ugUWxNnDYpjVSsiO04vs/GmBLs8PhO5UycN80SMdmeRaOgdPUX58idpTQW7G1ktnc6Imq1XrVEi7J8zoZB2P50pVe2qBiPi0hcPeMd7tU9h3dpTpeyYJyGklQIjlMmsk5H7SKJUfFMsQhzdjb9N6PsoHvyj0XPSSShmlwDJAiCgP9fRdOSYhy3dTAfM6AhEbzd4EDUMKzoCPdKpciuRrlkPsL4et1A48kJC/swWImMFYpJ4P3Wm2nlHoujgmAEY1/x+A2CcSRlq8IerOKhKylJVz8IXq2Ts0yw5xhc88EaIz5oKDwhDza66YpTk9rjEXtQLQNFyAKAJyJbKL+nM53hcO9rqTTESrVcW8gJLRqTVKRg58/I6NBvc8u9wKewYLkEB4D+3+NB95FOrOLTB8o1FVXEiXMJ9eLddUiepmNllG96Ugn3oVGsXM8m5UiH0kSfN5hf2+JU6PO0knysgkDKTuVYh3A+mkgVzyJRYzJbivd9IkAK1+8dl/+5eTz31iBiLxdSDI+K3tTMY2c2uqmujUm+KfeYOp+GvMTJsI3rZxUAjmmztG5DwaBOQfz4NsOxz77pAAAAAASUVORK5CYII=";
    var BogotaIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAADAUlEQVQ4T7WTW0hTcRzHz/8w6CUKISiioIhKikCbzpk3VApvky6ardK2uU3nZc7NzbnUxGvO27zmLUPEa5luriP24AnqIXywAjOhHpTwpad6jfLb/xwHIpOe6gc/DvzP+X7O7/f9/37MPw+p2lMn07ob5LoXt8Oy55LC9V69XOful2o8qyHZnpUQjbtVluNVRufORUXkcZFheo86Mp9z+uQ7kWga5EubrZDrplDblYfGR3pUdRQiu6oeiUWDsDjtqHCZYGwoh1Qzg6wKJ2Q6z6pPvhOV7Ua+hgLiC4ZxufAJYgyjMDeW4V5Fo/i0NdlwxTiEtNIOFNRVimdKR48/6Jq1mxf+aKq3Yu2VBN9WDonJDbN4/YzFj7UD2PxwBMvz+zA+lYLWATUicqb9QeG6Sd7RakGJ04qwIIL0ZIK3syw0GQQPTARvplkkxRHcUhCMTSlQ121AqHaP1oJUbl6qeQ7Bp2oLQcBBBoGnGBgyCZSpBMHnGRzYz8CoJhidVIB+T0Fz/qCbdhd/v82MMlrVMsfiwlkG9HhXHj3MYGFku6I0W+feFVmbbXzH4yyUtxXj+woLrZJAItkNyrxOsLnEYnEhHEX09vLq6v1BqeYe0SOhNWywWFtkYcslOH2CwcnjDO5cJXhHK8UXVjT7IR2P2PxJf1CwapbPqa4WQVvdVNDJormcgPiqEQzfaqPZwoqttfRr6K3N+IMu6Sf4YPXsNqiHRVMCwbCNRVQoQbycYLySoC+Rgvq3QaHZ03ubbW8pESdbGMDf6xJ86qNVUXG9jaDZQQEqgo1xekbbFrwUJjvBNOIPynC0v3T26nC3vEn86OlYIj5yZ7A0J8H7eRbr3DFw7hg4Ws3i2ghmKyxDyz75TtAlTZfrJn419WnFFaGeIcPuQk1XvlilMDdCKsy96B1WIqW4/2eIxnPDJ98dsQavVKbzChv/+SL1S9gn14AKrkEVDLVVIijaMPGVzk9nXCF3zif7eyTbvQERBk5BRSOhWjcn13tyU8x8oO/1/wqG+QNiJs5Og1W2+gAAAABJRU5ErkJggg==";
    var ZoomEarthIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAADhElEQVQ4T32TXWgUVxTHB0F8FTO7Mzs7mcl+RY3GBk1VTPwINcGvULFqQPoira1t1RC1+CTxQaTUtulO8SEPbUBsaUFpQrKmrK0sWY3ZZTfRzc4StjHFRNeNawyJlkBY8/fcu5NW0fYPl7kz957fnHv+5wpvUktLy+Lh4eFKM2Ua09PTxtT0lDFwZ8DIZDJlbM3a9v9KJBMHR++Pjl1pv4yPjhzCrr07seu9Hfik8TA6utoxMnJ3LJ1O11vb36zB5GDw2vVrz8vXlUNy2SC77ZBddth1kQ+HS8K6TZXoi97Kx+LRoBX2qkwzGfzh4vdweGWIJSJsNOwlBGMgNicQmztK7NCXqfjpl0swU4Mdfv/RRRZCEKgeBwPdXc8VjwRRLyKIjUMkykiiYIm9ayJ/OticoKpXQncwgHg82sAhbW1ti7PZh2MVdBwGESlALVXh9Cn/QihQ0m0oLnXCtUzj32SXiJrtG/Hg4QOztbV1IcumMtDdCZkWRY2BilC9tQrZ8SzOf3se67eshcMtYdXalXgy+QRb6jYRROIwp09CNB5B1x9dutDfHzNOnmqiP1JdOEjkoHnNzMwg1BNC0+eNmJ2dxebaan48B5mh+mR8891XuB763RBYj+zZX2+BxNdA85qbm+PPmtoNUEqWQNGXwLNcxbETn+FR7pEh5HI5Y0/Du1TMQjZsbCQQC8zn8zz4Ze3etw0Vb5eifLUHZRVuHG06jEw2YwjhcMg4TmkXjkWOMVBtFa/H+x8eQEegHc+ePbUwwDvbq+FbrmDVGi8Hffn1OXR2thsCa/urvwUKR6PBHGIg6m743vLxHmKF9l9owcTEY2yu2wDNbYPus6PYa0M01odIJFLE7b83em9sTdXqf0DFZL+2lNkscYcUt8ybUSP73WUaij02aORYXX0NRv4aKdjPlL6brg/3hvNqqVLoGcpCpr5RCMIcclJjKpSF4hahL3UQRIZ3pY6emz1/307eruaQefVFeoM//nwJikcudDUBVZqrHnYEyooaUKVMGMi7QqML/CsischlK/xVpYZSHaxezH6ZmtBJ945dBY2GTlm46Y7t3F2HnhshJM3EFSvsdfn9/kVDfw415CZy5o3eMJrPnsbHRz7Ap42HcPaLM4hE+zA+njUTZmJHc3PzAivsvxWLxRbG43F94E6/MTU1aUxOThjkjpFKpYrYmrXtJQnCCzP4PmtswqUfAAAAAElFTkSuQmCC";
    var WI511Icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMjHxIGmVAAACoUlEQVQ4T52SXUhTYRzG3yUUCRJS2IWWJEFFRjcRFXXTldRFRBB1UURmTptzQy2dpmuZmoIKlvNGrGnbzjZ3tjPnx+bIY9b82Jluc87NpWtz8yvzYyjzC/vHkVF4lS8//jz/h+d5DxxehDKJvYAy1XsBsVV/s59LnCrufNhIFbU6snBbhWFMbJqMztUeK+z4J4ky8DAnBbp7DQMHuOqww2Dj+zJV+ZqRbvfPxBJD2IeakuZonja2oC287qauZ9w1G0zgd/xZEas5gd/umF6+WkVeqyJdM8HR6WWgTOc8W6wH/259H48YHg4sJb7RzwZDKkuAwYLaM0WXa257e7tIO/JSYwcBM01ijsvXWv2LsDIl5rXNLahBUjnkr+lyny/pRChdbg8sDfoWIjnK96R7yLdQqBle39wS9f0o1zuhcOS5emY5JB7wQrLS4BJ2f79Z2wM1GUZ5VRY/iBZb4AVujeIqg6GNBuNEm31qbDYYX6CFb/LUNggQVr+o13NG0I5QGna/3hja2DrNb6vQja6ub3rmV36trF0q7/QvrsJFSTUk1G7V9Vws00tNXuXgJFQQYmIR6bIv7jn4DderPr9utd94132QrWCkYfE8zeFsPIrTfKKg5UKpTk755JQ3Lo+ACtSkQEw27phaglvhmDzztElznEdwZGatzV+hc8Tmqnd8lCqhOcRRCMmxSv1ohtT0qsVWbXB+NI7jgz5Jv4eNUecErVfe6thSaiePnop3w0gVR3MU8bmqmKzmCKaENkFEsrCdDEr5tBdQShPAEvfnKMwP6r9yMdPl0naYt2tJtmTgUcO3O0Ly8QdjUrWBT1hB0HmEnjQCxJCvqXec2dgr7HLCLFJbsmQmgcbKJyzS/gkQOXIKXo2S8tJ5hJJF/02y6DfOCv0wOzejpgAAAABJRU5ErkJggg==";
    var OHGOIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAmCAYAAABkpNNFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuBJREFUeNrsWL9rFEEUnjsXRUE4iI2icE1io5gggrHJna0Ec6BljDaG2Oj+BWpje2djjM0laaOQYCxswqYxKQxusDI2GxRtDKwIijZxvvHeMrfZH5M4k3iDD4abH7fvzbfz3vfeToFNjG0yy6TILBSACm0E5f93vw4BFdgIat0yTKGj+s/KsR420nOelQ93sfDndza1tsxmg9Vo/XprLfi2wSb5WtoczV8un2GlA4fE2v2VF+I3y94ctyXryBDfUSEKbKJZudY2N8Q31Xi7wNylp2I8crKfVY52M+/z+8h40hz0QF8kfB3j6nyDeZ/WMu0NcKA3vGk9lF6/cDXqY4Phrx+if+f0RdbbdVzZL7AxAgQd/sbHaK05MJxrD88q2AtyQcENSvsPij5Opfq8Lpq8UVWRN9T37IFocD0I3AxNg731IhsdV85T9GblN7xToRjCSZAAlA57zl5TFeKo8ORWm2f8rUpKvlblKkcCVdahEGy3efOR0n/vnb3UNlakbH15yoTcjYGS42vHwjmC3E9bUYugRs5BywtwMJ+m00ksaL9qq1F4TkHwo1F+SXU/DmpKLyjfxio9lEF5e7ULSrQ6QeUSBYpJktunqmIsZ/V4IaoqKLEQczJZ+F8+iCI3y16OS6/GKT018MFKoGoojxuQK/U8ASkQiHr/lS1r0CdiMsPe5LslRaIYHc9MvrWXj7cwGQygJssjg3hphCo7/gxAuK9mdNgTOArRUOGqTC5h6DNBLlbhOnAX2lDSHMVR75ETkXunUT89n2QvRar8gDwZ1Bvo6XD2E6CKceboaOGArL5NIlm0IfHadlJ+EihrvqmcGFId5VJpmywaaHqhc9QpGHlVE2NNXP4oAurjrBWaIgqd4ip+o9V0AzIH6s9Gazm5z93OTda/cFJUT9bSalu+3tiNPGUqw7sJ1OuaNLvPOL/Ov15mg+fKLUYMW3FkNH3s1m2S2wL10FQcyfJbgAEAoYVrOr+EMnkAAAAASUVORK5CYII=";

    function initInterface(){
        var $section = $("<div>");
        $section.html([
            '<div>',
            "<p>The below maps are legal to use and do not violate Waze's external sources policy</p>",
            `<div><input type="checkbox" id="chkMiDrive" class="OOMchk"><label for="chkMiDrive"><img src="${midriveIcon}" height="18" width="18">MiDrive</label></div>`,
            `<div><input type="checkbox" id="chkNYFC" class="OOMchk"><img src="${NYFCIcon}" height="18" width="18">NY FC</div>`,
            `<div><input type="checkbox" id="chkrosreestr" class="OOMchk"><label for="chkrosreestr"><img src="${rosreestrIcon}" height ="18" width="18">Rosreestr</label></div>`,
            `<div><input type="checkbox" id="chkPA511" class="OOMchk"><label for="chkPA511"><img src="${PA511Icon}" height = 18 width="18">511PA</label></div>`,
            `<div><input type="checkbox" id="chkMiss511" class="OOMchk"><label for="chkMiss511"><img src="${Miss511Icon}" height=18 width="18">Mississippi 511</label></div>`,
            `<div><input type="checkbox" id="chkLAFC" class="OOMchk"><label for="chkLAFC"><img src="${LAFCIcon}" height="18" width="18">Louisiana FC</label></div>`,
            //`<div><input type="checkbox" id="chkNJ511" class="OOMchk"><label for="chkNJ511"><img src="${NJ511Icon}" height="18" width="18">New Jersey 511</label></div>`,//NJ does not directly use the map at this time
            `<div><input type="checkbox" id="chkNM511" class="OOMchk"><label for="chkNM511"><img src="${NM511Icon}" height="18" width="18">New Mexico 511</label></div>`,
            `<div><input type="checkbox" id="chkWVFlood" class="OOMchk"><label for="chkWVFlood"><img src="${WVFloodIcon}" height="18" width="18">WV Flood</label></div>`,
            `<div><input type="checkbox" id="chkGMDM" class="OOMchk"><label for="chkGMDM"><img src="${GMDMIcon}" height="18" width="18">Gaia - Mexico</label></div>`,
            `<div><input type="checkbox" id="chkPennDOT" class="OOMchk"><label for="chkPennDOT"><img src="${PennDOTIcon}" height="18" width="18">PennDOT One Map</label></div>`,
            `<div><input type="checkbox" id="chkBogota" class="OOMchk"><label for="chkBogota"><img src="${BogotaIcon}" height="18" width ="18">Bogota</label></div>`,
            `<div><input type="checkbox" id="chkWI511" class="OOMchk"><label for="chkWI511"><img src=${WI511Icon} height="18" width="18">WI 511</label></div>`,
            '</br>',
            "<p>The below maps are for <span style='color:red; font-weight:bold;'>reference only</span> and <b>no data</b> should be copied from them as it violates Waze's external sources policy.</p>",
            `<div><input type="checkbox" id="chkGMaps" class="OOMchk"><label for="chkGMaps"><img src="${gmapsIcon}" height="18" width="18">Google Maps</label></div>`,
            `<div><input type="checkbox" id="chkMapillary" class="OOMchk"><label for="chkMapillary"><img src="${mapillaryIcon}" height="18" width="18">Mapillary</label></div>`,
            `<div><input type="checkbox" id="chkTerraserver" class="OOMchk"><label for="chkTerraserver"><img src="${terraIcon}" height="18" width="18">Terraserver</label></div>`,
            `<div><input type="checkbox" id="chkWikimapia" class="OOMchk"><label for="chkWikimapia"><img src="${wikimapiaIcon}" height="18" width="18">Wikimapia</label></div>`,
            `<div><input type="checkbox" id="chkBing" class="OOMchk"><label for="chkBing"><img src="${bingIcon}" height="18" width="18">Bing Maps</label></div>`,
            `<div><input type="checkbox" id="chkOSM" class="OOMchk"><label for="chkOSM"><img src="${osmIcon}" height="18" width ="18">Open Street Map</label></div>`,
            `<div><input type="checkbox" id="chkYandex" class="OOMchk"><label for="chkYandex"><img src="${yandexIcon}" height="18" width ="18">Yandex</label></div>`,
            `<div><input type="checkbox" id="chkHere" class="OOMchk"><label for="chkHere"><img src="${hereIcon}" height="18" width ="18">Here</label></div>`,
            `<div><input type="checkbox" id="chkZoomEarth" class="OOMchk"><label for="chkZoomEarth"><img src="${ZoomEarthIcon}" height="18" width ="18">Zoom Earth</label></div>`,
            `<div title='Roadworks (https://roadworks.org/)'><input type="checkbox" id="chkRoadworks" class="OOMchk"><label for="chkRoadworks"><img src="${RoadworksIcon}" height="18" width ="18">Roadworks</label></div>`,
            `<div><input type="checkbox" id="chkOHGO" class="OOMchk"><label for="chkOHGO"><img src="${OHGOIcon}" height="18" width="18">OHGO</label></div>`,
            '</br><div>',
            '<fieldsetstyle="border: 1px solid silver; padding: 8px; border-radius: 4px;">',
            '<legend style="margin-bottom:0px; border-bottom-style:none;width:auto;"><h4>Map Language (where applicable)</h4></legend>',
            '<input type="radio" name="radOOMLanguage" id="radOOMNoLang">Do not set a language</br>',
            '<input type="radio" name="radOOMLanguage" id="radOOMWMELang">Use WME language</br>',
            '<input type="radio" name="radOOMLanguage" id="radOOMCustomLang">Custom language <input type="text" name="txtOOMLanguage" id="txtOOMLanguage" style="border: 1px solid #000000;" size="4"/>',
            '</fieldset>',
            '</div>',
            '</div>'
        ].join(' '));

        new WazeWrap.Interface.Tab('OOM', $section.html(), init);
    }

    function getolControlAttributionDivRightValue(){
        return parseInt($('.olControlAttribution').css("right").slice(0,-2));;
    }

    function init(){
        loadSettings();
        setChecked('chkGMaps', settings.GMaps);
        setChecked('chkMapillary', settings.Mapillary);
        setChecked('chkTerraserver', settings.Terraserver);
        setChecked('chkWikimapia', settings.Wikimapia);
        setChecked('chkBing', settings.Bing);
        setChecked('chkOSM', settings.OSM);
        setChecked('chkYandex', settings.Yandex);
        setChecked('chkHere', settings.Here);
        setChecked('chkMiDrive', settings.MiDrive);
        setChecked('chkNYFC', settings.NYFC);
        setChecked('chkrosreestr', settings.rosreestr);
        setChecked('chkPA511', settings.PA511);
        setChecked('chkMiss511', settings.Miss511);
        setChecked('chkLAFC', settings.LAFC);
        setChecked('chkNM511', settings.NM511);
        //setChecked('chkNJ511', settings.NJ511);
        setChecked('chkWVFlood', settings.WVFlood);
        setChecked('chkGMDM', settings.GMDM);
        setChecked('chkBogota', settings.Bogota);
        setChecked('chkZoomEarth', settings.ZoomEarth);
        setChecked('chkRoadworks', settings.Roadworks);
        setChecked('chkWI511', settings.WI511);
        setChecked('chkOHGO', settings.OHGO);

        if(settings.LangSetting == 0)
            setChecked("radOOMNoLang", true);
        else if(settings.LangSetting == 1)
            setChecked("radOOMWMELang", true);
        else
            setChecked("radOOMCustomLang", true);

        $('#txtOOMLanguage')[0].value = settings.CustLang;

        let annoyingDivRight = getolControlAttributionDivRightValue();
        $('.olControlAttribution').css("right", `${annoyingDivRight+100}px`);
        annoyingDivRight = getolControlAttributionDivRightValue();
        let checkedBoxes = $('.OOMchk:Checked');
        let totalButtonsWidth = 0;
        for(let i=0; i<checkedBoxes.length;i++){
            totalButtonsWidth += parseInt($(`label[for='${$(checkedBoxes[i]).attr('id')}'] img`).css('width').slice(0,-2));
        }
        $('.olControlAttribution').css("right", `${annoyingDivRight+totalButtonsWidth}px`);

        LoadMapButtons();
        $('.OOMchk').change(function() {
             var settingName = $(this)[0].id.substr(3);
            settings[settingName] = this.checked;
            saveSettings();
            LoadMapButtons();

            let btnWidth = parseInt($(`label[for='${$(this).attr('id')}'] img`).css('width').slice(0,-2));
            if(this.checked){ //add button width
                let annoyingDivRight = getolControlAttributionDivRightValue();
                $('.olControlAttribution').css("right", `${annoyingDivRight+btnWidth}px`);
            }
            else{ //subtract button width
                let annoyingDivRight = getolControlAttributionDivRightValue();
                $('.olControlAttribution').css("right", `${annoyingDivRight-btnWidth}px`);
            }
        });
        $("[id^='rad']").change(function() {
            if(isChecked("radOOMNoLang"))
                settings.LangSetting = 0;
            else if(isChecked("radOOMWMELang"))
                settings.LangSetting = 1;
            else
                settings.LangSetting = 2;
            saveSettings();
        });
        $('#txtOOMLanguage').focusout(function(){
            settings.CustLang = $('#txtOOMLanguage').val();
            saveSettings();
        });
    }

    function GetLanguage()
    {
        if(isChecked("radOOMNoLang"))
            return "";
        else if(isChecked("radOOMWMELang"))
            return I18n.currentLocale().replace("en-US", "en");
        else //Custom Language
            return $('#txtOOMLanguage').val();
    }

    function get4326CenterPoint(){
        let projI = new OL.Projection("EPSG:900913");
        let projE = new OL.Projection("EPSG:4326");
        let center_lonlat = (new OL.LonLat(W.map.center.lon, W.map.center.lat)).transform(projI,projE);
        let lat = Math.round(center_lonlat.lat * 1000000) / 1000000;
        let lon = Math.round(center_lonlat.lon * 1000000) / 1000000;
        return new OL.LonLat(lon, lat);
    }

    function LoadMapButtons()
    {
        $('#OOMMiDrive').remove();
        if(settings.MiDrive)
        {
            let $section = $("<div>", {style:"padding:8px 16px"});
            $section.html([
                '<span id="OOMMiDrive">',
                `<img src="${midriveIcon}" alt="MiDrive" width="18" height="18" id="OOMMiDriveImg" title="Open in MiDrive" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($section.html());

            $('#OOMMiDriveImg').click(function(){
                var center = W.map.getCenter().transform(W.map.projection, W.map.displayProjection);
                window.open(`https://mdotjboss.state.mi.us/MiDrive/map?constZone=true&incidents=true&lat=${center.lat}&lon=${center.lon}&zoom=${W.map.zoom + 12}`, 'MiDrive');
            });
        }

        $('#OOMGMaps').remove();
        if(settings.GMaps)
        {
            let $section = $("<div>", {style:"padding:8px 16px"});
            $section.html([
                '<span id="OOMGMaps">',
                `<img src="${gmapsIcon}" alt="Google Maps" width="18" height="18" id="OOMGMapsImg" title="Open in Google Maps" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($section.html());

            $('#OOMGMapsImg').click(function(){
                let latlon = get4326CenterPoint();
                let lang = GetLanguage();

                window.open('https://www.google.com/maps/@' + latlon.lat + ',' + latlon.lon + ',' + ( W.map.zoom + 12) + 'z' + (lang != "" ? "?hl=" + lang : ""), 'Google Maps');
            });
        }

        //************** Mapillary *****************
        $('#OOMMapillary').remove();
        if(settings.Mapillary){
            let $sectionMapillary = $("<div>", {style:"padding:8px 16px"});
            $sectionMapillary.html([
                '<span id="OOMMapillary">',
                `<img src="${mapillaryIcon}" alt="Mapillary" width="18" height="18" id="OOMMapillaryImg" title="Open in Mapillary" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionMapillary.html());
            $('#OOMMapillaryImg').click(function(){
                let latlon = get4326CenterPoint();

                window.open(`https://www.mapillary.com/app/?lat=${latlon.lat}&lng=${latlon.lon}&z=${( W.map.zoom + 11)}`, 'Mapillary');
            });
        }


        //****************** Terraserver *********************
        $('#OOMTerraserver').remove();
        if(settings.Terraserver){
            var $sectionTerraserver = $("<div>", {style:"padding:8px 16px"});
            $sectionTerraserver.html([
                '<span id="OOMTerraserver">',
                `<img src="${terraIcon}" alt="Terraserver" width="18" height="18" id="OOMTerraserverImg" title="Open in Terraserver" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionTerraserver.html());
            $('#OOMTerraserverImg').click(function(){
                var center_lonlat=OL.Layer.SphericalMercator.inverseMercator(W.map.getCenter().lon,W.map.getCenter().lat);
                window.open(`http://www.terraserver.com/view?utf8=✓&searchLng=${center_lonlat.lon}&searchLat=${center_lonlat.lat}`);
            });
        }


        //********************* Wikimapia *********************
        $('#OOMWikimapia').remove();
        if(settings.Wikimapia){
            let $sectionWikimapia = $("<div>", {style:"padding:8px 16px"});
            $sectionWikimapia.html([
                '<span id="OOMWikimapia">',
                `<img src="${wikimapiaIcon}" alt="Wikimapia" width="18" height="18" id="OOMWikimapiaImg" title="Open in Wikimapia" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionWikimapia.html());
            $('#OOMWikimapiaImg').click(function(){
                let latlon = get4326CenterPoint();
                let lang = GetLanguage();
                if(lang === "")
                    lang = "en";
                window.open(`http://wikimapia.org/#${(lang !== "" ? "lang=" + lang : "")}&lat=${latlon.lat}&lon=${latlon.lon}&z=${( W.map.zoom + 12)}&m=b`);
            });
        }

        $('#OOMBing').remove();
        if(settings.Bing)
        {
            let $sectionBing = $("<div>", {style:"padding:8px 16px"});
            $sectionBing.html([
                '<span id="OOMBing">',
                `<img src="${bingIcon}" alt="Bing Maps" width="18" height="18" id="OOMBingImg" title="Open in Bing Maps" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionBing.html());

            $('#OOMBingImg').click(function(){
                let latlon = get4326CenterPoint();
                //let lang = I18n.currentLocale().replace("en-US", "en");

                window.open(`https://www.bing.com/maps?&cp=${latlon.lat}~${latlon.lon}&lvl=${( W.map.zoom + 12)}`);
            });
        }

        $('#OOMOSM').remove();
        if(settings.OSM){
            //https://www.openstreetmap.org/#map=16/39.5588/-84.2365
            let $sectionOSM = $("<div>", {style:"padding:8px 16px"});
            $sectionOSM.html([
                '<span id="OOMOSM">',
                `<img src="${osmIcon}" alt="Open Street Map" width="18" height="18" id="OOMOSMImg" title="Open in Open Street Maps" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionOSM.html());

            $('#OOMOSMImg').click(function(){
                let latlon = get4326CenterPoint();
                //let lang = I18n.currentLocale().replace("en-US", "en");

                window.open(`https://www.openstreetmap.org/#map=${(W.map.zoom + 12)}/${latlon.lat}/${latlon.lon}`);
            });
        }

        $('#OOMYandex').remove();
        if(settings.Yandex){
            //https://n.maps.yandex.ru/#!/?z=14&ll=46.019795%2C51.505120&l=nk%23sat
            let $sectionYandex = $("<div>", {style:"padding:8px 16px"});
            $sectionYandex.html([
                '<span id="OOMYandex">',
                `<img src="${yandexIcon}" alt="Yandex" width="18" height="18" id="OOMYandexImg" title="Open in Yandex" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionYandex.html());

            $('#OOMYandexImg').click(function(){
                let latlon = get4326CenterPoint();
                //let lang = I18n.currentLocale().replace("en-US", "en");

                window.open(`https://n.maps.yandex.ru/#!/?z=${(W.map.zoom + 12)}&ll=${latlon.lon}%2C${latlon.lat}&l=nk%23sat`);
            });
        }

        $('#OOMHere').remove();
        if(settings.Here){
            //https://wego.here.com/?map=39.56508,-84.26224,16,normal&x=ep
            let $sectionHere = $("<div>", {style:"padding:8px 16px"});
            $sectionHere.html([
                '<span id="OOMHere">',
                `<img src="${hereIcon}" alt="Here" width="18" height="18" id="OOMHereImg" title="Open in Here" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionHere.html());

            $('#OOMHereImg').click(function(){
                let latlon = get4326CenterPoint();

                window.open(`https://wego.here.com/?map=${latlon.lat},${latlon.lon},${(W.map.zoom + 12)},satellite&x=ep`);
            });
        }

        $('#OOMNYFC').remove();
        if(settings.NYFC){
            let $sectionNYFC = $("<div>", {style:"padding:8px 16px"});
            $sectionNYFC.html([
                '<span id="OOMNYFC">',
                `<img src="${NYFCIcon}" alt="NY FC" width="18" height="18" id="OOMNYFCImg" title="Open in NY FC" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionNYFC.html());

            $('#OOMNYFCImg').click(function(){
                let e=W.map.getExtent();
                let geoNW=new OL.Geometry.Point(e.left,e.top);
                let geoSE=new OL.Geometry.Point(e.right,e.bottom);

                Proj4js.defs["EPSG:26918"] = "+proj=utm +zone=18 +ellps=GRS80 +datum=NAD83 +units=m +no_defs";

                let source = new Proj4js.Proj('EPSG:900913');
                let dest = new Proj4js.Proj('EPSG:26918');

                geoNW = new Proj4js.Point(geoNW.x,geoNW.y);
                geoSE = new Proj4js.Point(geoSE.x,geoSE.y);

                Proj4js.transform(source, dest, geoNW);
                Proj4js.transform(source, dest, geoSE);

                let mapScale = 36111.909643;

                switch (W.map.zoom) {
                    case 0:
                    case 1:
                        mapScale = 72223.819286;
                        break;
                    case 2:
                        mapScale = 36111.909643;
                        break;
                    case 3:
                        mapScale = 18055.954822;
                        break;
                    default:
                        mapScale = 9027.977411;
                        break;
                }

                let URL='http://gis3.dot.ny.gov/html5viewer/?viewer=FC&scale='+mapScale+'&extent='+geoNW.x+'%2C'+geoNW.y+'%2C'+geoSE.x+'%2C'+geoSE.y;
                window.open(URL,"_blank");
            });
        }

        $('#OOMrosreestr').remove();
        if(settings.rosreestr){
            let $sectionRosreestr = $("<div>", {style:"padding:8px 16px"});
            $sectionRosreestr.html([
                '<span id="OOMrosreestr">',
                `<img src="${rosreestrIcon}" alt="Rosreestr" width="18" height="18" id="OOMrosreestrImg" title="Open in Rosreestr" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionRosreestr.html());

            $('#OOMrosreestrImg').click(function(){
                window.open(`http://pkk5.rosreestr.ru/#x=${W.map.center.lon}&y=${W.map.center.lat}&z=${(W.map.zoom + 12)}`);
            });
        }

        $('#OOMPA511').remove();
        if(settings.PA511){
            let $sectionPA511 = $("<div>", {style:"padding:8px 16px"});
            $sectionPA511.html([
                '<span id="OOMPA511">',
                `<img src="${PA511Icon}" alt="511PA" width="18" height="18" id="OOMPA511Img" title="Open in 511PA" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionPA511.html());

            $('#OOMPA511Img').click(function(){
                let latlon = get4326CenterPoint();
                window.open(`http://www.511pa.com/Traffic.aspx?${latlon.lat},${latlon.lon},${(W.map.zoom + 12)}z`);
            });
        }

        $('#OOMMiss511').remove();
        if(settings.Miss511)
        {
            let $section = $("<div>", {style:"padding:8px 16px"});
            $section.html([
                '<span id="OOMMiss511">',
                `<img src="${Miss511Icon}" alt="Mississippi 511" width="18" height="18" id="OOMMiss511Img" title="Open in Mississippi 511" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($section.html());

            $('#OOMMiss511Img').click(function(){
                let latlon = get4326CenterPoint();
                let lang = GetLanguage();

                window.open(`https://www.mdottraffic.com/default.aspx?lat=${latlon.lat}&lon=${latlon.lon}&zoom=${(W.map.zoom + 12)}`, 'Mississippi 511');
            });
        }

        $('#OOMLAFC').remove();
        if(settings.LAFC){
            let $sectionLAFC = $("<div>");
            $sectionLAFC.html([
                '<span id="OOMLAFC">',
                `<img src="${LAFCIcon}" alt="LAFC" width="18" height="18" id="OOMLAFCImg" title="Open in Louisiana FC Map" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionLAFC.html());
            $('#OOMLAFCImg').click(function(){
                let latlon = get4326CenterPoint();
                window.open(`http://www.arcgis.com/home/webmap/viewer.html?webmap=a37461260bec43dea7bcbf6b710a662e&center=${latlon.lon},${latlon.lat}&level=${(W.map.zoom + 12)}`);
            });
        }

        /*$('#OOMNJ511').remove();
        if(settings.NJ511){
            let $sectionNJ511 = $("<div>");
            $sectionNJ511.html([
                '<span id="OOMNJ511">',
                `<img src="${LAFCIcon}" alt="LAFC" width="18" height="18" id="OOMNJ511Img" title="Open in New Jersey 511 Map" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionNJ511.html());
            $('#OOMNJ511Img').click(function(){
                let latlon = get4326CenterPoint();
                window.open(`http://www.511nj.org/trafficmap.aspx?X=${latlon.lat}&Y=${latlon.lon}&zoom=${(W.map.zoom + 12)}`);
            });
        }*/

        $('#OOMNM511').remove();
        if(settings.NM511){
            let $sectionNM511 = $("<div>");
            $sectionNM511.html([
                '<span id="OOMNM511">',
                `<img src="${NM511Icon}" alt="New Mexico 511" width="18" height="18" id="OOMNM511Img" title="Open in New Mexico 511 Map" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionNM511.html());
            $('#OOMNM511Img').click(function(){
                let latlon = W.map.center;

                //http://nmroads.com/mapIndex.html?
                window.open(`http://nmroads.com/mapIndex.html?X=${latlon.lon}&Y=${latlon.lat}&zoom=${(W.map.zoom + 12)}`);
            });
        }

        $('#OOMWVFlood').remove();
        if(settings.WVFlood){
            let $sectionWVFlood = $("<div>");
            $sectionWVFlood.html([
                '<span id="OOMWVFlood">',
                `<img src="${WVFloodIcon}" alt="WV Flood" width="18" height="18" id="OOMWVFloodImg" title="Open in WV Flood map" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionWVFlood.html());
            $('#OOMWVFloodImg').click(function(){
                let latlon = W.map.center;

                //https://www.mapwv.gov/flood/map/?x=-8915274&y=4681300&l=4&v=0
                window.open(`https://www.mapwv.gov/flood/map/?x=${latlon.lon}&y=${latlon.lat}&l=${(W.map.zoom+4)}`);
            });
        }

        $('#OOMGMDM').remove();
        if(settings.GMDM){
            let $sectionGMDM = $("<div>");
            $sectionGMDM.html([
                '<span id="OOMGMDM">',
                `<img src="${GMDMIcon}" alt="Gaia Mexico" width="18" height="18" id="OOMGMDMImg" title="Open in Gaia Digital Mapa de Mexico" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionGMDM.html());
            $('#OOMGMDMImg').click(function(){
                let latlon = W.map.center.transform(W.map.projection, W.map.displayProjection);

                window.open(`http://gaia.inegi.org.mx/mdm6/?v=${btoa("lat:"+latlon.lat+",lon:"+latlon.lon+",z:"+(W.map.zoom+8))}`);
            });
        }

        $('#OOMPennDOT').remove();
        if(settings.PennDOT){
            let $sectionPennDOT = $("<div>");
            $sectionPennDOT.html([
                '<span id="OOMPennDOT">',
                `<img src="${PennDOTIcon}" alt="Pennsylvania OneMap" width="18" height="18" id="OOMPennDOTImg" title="Open in Pennsylvania OneMap" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionPennDOT.html());
            $('#OOMPennDOTImg').click(function(){
                let latlon = W.map.center.transform(W.map.projection, W.map.displayProjection);
                window.open(`https://www.dot7.state.pa.us/OneMap?longitude=${latlon.lon}&latitude=${latlon.lat}`);
            });
        }

        $('#OOMBogota').remove();
        if(settings.Bogota){
            let $sectionBogota = $("<div>");
            $sectionBogota.html([
                '<span id="OOMBogota">',
                `<img src="${BogotaIcon}" alt="Bogota" width="18" height="18" id="OOMBogotaImg" title="Open in Mapas Bogota" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionBogota.html());
            $('#OOMBogotaImg').click(function(){
                var topleft= (new OL.LonLat(W.map.getExtent().left,W.map.getExtent().top));
                var bottomright= (new OL.LonLat(W.map.getExtent().right,W.map.getExtent().bottom));

                let source = new Proj4js.Proj('EPSG:900913');
                var topleft4686 = new Proj4js.Point(parseFloat(topleft.lon), parseFloat(topleft.lat));
                var bottomright4686 = new Proj4js.Point(parseFloat(bottomright.lon), parseFloat(bottomright.lat));
                Proj4js.transform(source, Proj4js.WGS84, topleft4686);
                Proj4js.transform(source, Proj4js.WGS84, bottomright4686);

                let latlon = W.map.center.transform(W.map.projection, W.map.displayProjection);
                window.open(`http://mapas.bogota.gov.co/?&e=${topleft4686.x},${bottomright4686.y},${bottomright4686.x},${topleft4686.y},4686&b=261`);
            });
        }

        $('#OOMZoomEarth').remove();
        if(settings.ZoomEarth)
        {
            let $section = $("<div>", {style:"padding:8px 16px"});
            $section.html([
                '<span id="OOMZoomEarth">',
                `<img src="${ZoomEarthIcon}" alt="Zoom Earth" width="18" height="18" id="OOMZoomEarthImg" title="Open in Zoom Earth" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($section.html());

            $('#OOMZoomEarthImg').click(function(){
                let latlon = get4326CenterPoint();
                let lang = GetLanguage();
                window.open(`https://zoom.earth/#${latlon.lat},${latlon.lon},${( W.map.zoom + 12)}z,map`, 'Zoom Earth');
            });
        }

        $('#OOMRoadworks').remove();
        if(settings.Roadworks)
        {
            let $section = $("<div>", {style:"padding:8px 16px"});
            $section.html([
                '<span id="OOMRoadworks">',
                `<img src="${RoadworksIcon}" alt="Roadworks" width="18" height="18" id="OOMRoadworksImg" title="Open in Roadworks" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($section.html());

            $('#OOMRoadworksImg').click(function(){
                let latlon = get4326CenterPoint();
                window.open(`https://roadworks.org/?lng=${latlon.lon}&lat=${latlon.lat}&zoom=${( W.map.zoom + 12)}`, 'Roadworks');
            });
        }

        $('#OOMWI511').remove();
        if(settings.WI511){
            let $sectionWI511 = $("<div>", {style:"padding:8px 16px"});
            $sectionWI511.html([
                '<span id="OOMWI511">',
                `<img src="${WI511Icon}" alt="511WI" width="18" height="18" id="OOMWI511Img" title="Open in 511WI" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionWI511.html());

            $('#OOMWI511Img').click(function(){
                let latlon = get4326CenterPoint();
                window.open(`https://511wi.gov/?Latitude=${latlon.lat}&Longitude=${latlon.lon}&Zoom=${(W.map.zoom + 12)}&SelectedLayers=WeatherAlerts,Incidents#:Alerts`);
            });
        }

        $('#OOMOHGO').remove();
        if(settings.OHGO){
            let $sectionOHGO = $("<div>", {style:"padding:8px 16px"});
            $sectionOHGO.html([
                '<span id="OOMOHGO">',
                `<img src="${OHGOIcon}" alt="511WI" width="18" height="18" id="OOMOHGOImg" title="Open in OHGO" style="cursor:pointer; float: left; display:inline-block; margin: 2px 5px 0 3px;">`,
                '</span>'
            ].join(' '));

            $('.view-area.olMap >div > div > div.WazeControlPermalink').append($sectionOHGO.html());

            $('#OOMOHGOImg').click(function(){
                let latlon = get4326CenterPoint();
                window.open(`http://www.ohgo.com/central-ohio?lt=${latlon.lat}&ln=${latlon.lon}&z=${(W.map.zoom + 12)}&ls=incident,construction,camera`);
            });
        }
    }

    function loadSettings() {
        var loadedSettings = $.parseJSON(localStorage.getItem("OOM_Settings"));
        var defaultSettings = {
            GMaps: true,
            Mapillary: true,
            Terraserver: true,
            Wikimapia: false,
            Bing: false,
            OSM: false,
            LangSetting: 1,
            CustLang: "",
            Yandex: false,
            Here: false,
            MiDrive: false,
            NYFC: false,
            rosreestr: false,
            PA511: false,
            Miss511: false,
            LAFC: false,
            NM511: false,
            WVFlood: false,
            GMDM: false,
            PennDOT: false,
            Bogota: false,
            ZoomEarth: false,
            Roadworks: false,
            WI511: false,
            OHGO: false
            //NJ511: false
        };
        settings = loadedSettings ? loadedSettings : defaultSettings;
        for (var prop in defaultSettings) {
            if (!settings.hasOwnProperty(prop))
                settings[prop] = defaultSettings[prop];
        }
    }

    function saveSettings() {
        if (localStorage) {
            var localsettings = {
                GMaps: settings.GMaps,
                Mapillary: settings.Mapillary,
                Terraserver: settings.Terraserver,
                Wikimapia: settings.Wikimapia,
                Bing: settings.Bing,
                OSM: settings.OSM,
                LangSetting: settings.LangSetting,
                CustLang: settings.CustLang,
                Yandex: settings.Yandex,
                Here: settings.Here,
                MiDrive: settings.MiDrive,
                NYFC: settings.NYFC,
                rosreestr: settings.rosreestr,
                PA511: settings.PA511,
                Miss511: settings.Miss511,
                LAFC: settings.LAFC,
                NM511: settings.NM511,
                WVFlood: settings.WVFlood,
                GMDM: settings.GMDM,
                PennDOT: settings.PennDOT,
                Bogota: settings.Bogota,
                ZoomEarth: settings.ZoomEarth,
                Roadworks: settings.Roadworks,
                WI511: settings.WI511,
                OHGO: settings.OHGO
                //NJ511: settings.NJ511
            };

            localStorage.setItem("OOM_Settings", JSON.stringify(localsettings));
        }
    }

    function isChecked(checkboxId) {
        return $('#' + checkboxId).is(':checked');
    }

    function setChecked(checkboxId, checked) {
        $('#' + checkboxId).prop('checked', checked);
    }

    function bootstrapGeneral(initdelegate, tries = 1){
        if(document.readyState !== 'complete' )
            setTimeout(function() {bootstrapGeneral(initdelegate, tries++);}, 200);
        else
            initdelegate();
    }

    let is511PAloaded = false;
    function bootstrap511PA(tries = 1){
        if(iFrameVar.map){
            iFrameVar.map.addListener('tilesloaded', function() {
                //http://www.511pa.com/Traffic.aspx?40.85,-77.6,12z
                if(!is511PAloaded){
                    if(location.search.indexOf("?") > -1){
                        let params = location.search.split("?")[1].slice(0,-1);
                        iFrameVar.recenterMap(params);
                    }
                    is511PAloaded = true;
                }
            });
        }
        else{
            setTimeout(function(){bootstrap511PA(tries +=1);}, 100);
        }

        $(document).ready(function(){
            init511PA();
        });
    }

    function bootstrapNM511(tries = 1){
        if(map && map.extent && map.loaded)
            initNM511();
        else
            setTimeout(function() {bootstrapNM511(tries++);}, 100);
    }

    function bootstrapRoadworks(tries = 1){
        if(Elgin && Elgin.map && Elgin.map.tilesloading === false)
            initRoadworks();
        else
            setTimeout(function(){bootstrapRoadworks(tries++);}, 100);
    }

    function bootstrap(tries = 1) {
        if(location.href.indexOf("google.com/maps") > -1)
            bootstrapGeneral(initGoogleMaps, 1);
        else if(location.href.indexOf("wv511.org") > -1)
            bootstrapGeneral(initWV511, 1);
        else if(location.href.indexOf("511virginia.org") > -1)
            bootstrapGeneral(init511virginia, 1);
        else if(location.href.indexOf("https://mdotjboss.state.mi.us") > -1)
            bootstrapGeneral(initmiDrive, 1);
        else if(location.href.indexOf("http://pkk5.rosreestr.ru") > -1)
            bootstrapRosreestr(1);
        else if(location.href.indexOf("http://www.511pa.com/Traffic") > -1 || location.href.indexOf("https://www.511pa.com/Traffic") > -1)
            bootstrap511PA(1);//bootstrapGeneral(init511PA, 1);
        else if(location.href.indexOf("http://newengland511.org") > -1)
            bootstrapGeneral(initNE511, 1);
        else if(location.href.indexOf("https://www.mdottraffic.com") > -1){
            if(document.getElementById("map_canvas") != null)
                initMississipie511();
            else if(tries < 1000)
                setTimeout(function () {bootstrap(tries++);}, 200);
        }
        else if(location.href.indexOf("https://gis.transportation.wv.gov/measures") > -1){
            bootstrapGeneral(initWVGIS, 1);
        }
        else if(location.href.indexOf("http://nmroads.com/mapIndex.html") > -1){
            bootstrapNM511(1);
        }
        else if(location.href.indexOf("https://www.mapwv.gov/flood/map") > -1){
            bootstrapGeneral(initWVFlood, 1);
        }
        else if(location.href.indexOf("https://roadworks.org/") > -1){
            bootstrapRoadworks(1);
        }
        /*else if(location.href.indexOf("http://www.511nj.org/trafficmap") > -1){
            bootstrapGeneral(initNJ511, 1);
        }*/
        else{
            if (W &&
                W.map &&
                W.model &&
                $ && WazeWrap.Ready) {
                initInterface();
            } else if (tries < 1000) {
                setTimeout(function () {bootstrap(tries++);}, 200);
            }
        }
    }

    function RosreestrToWaze(){
        let lon, lat, zoom;
        let curURL = location.href.match(/x=(\d*.\d*)&y=(\d*.\d*)&z=(\d+)/);
        lon = curURL[1];
        lat = curURL[2];
        zoom = parseInt(curURL[3]);

        let source = new Proj4js.Proj('EPSG:900913');

        var point = new Proj4js.Point(parseFloat(lon), parseFloat(lat));
        Proj4js.transform(source, Proj4js.WGS84, point);
        return `https://www.waze.com/en-US/editor/?lon=${point.x}&lat=${point.y}&zoom=${(Math.max(0,Math.min(10,(zoom - 12))))}`;
    }

    function initRosreestr(){
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes" && mutation.target == document.getElementsByClassName("btn btn-default btn-tool-lg js-showList")[0]) insertWMELinkRosreestr();
            });
        });

        observer.observe(document.getElementById("sidebar-region"), { childList: true, subtree: true, attributes:true});

        insertWMELinkRosreestr();
    }

    function insertWMELinkRosreestr(){
        if(document.getElementById("OOMWazeButton") !== null)
            document.getElementById("OOMWazeButton").remove();

        let $OOMWazeButton = document.createElement("div");

        $OOMWazeButton.innerHTML = `<button type="button" class="btn btn-default btn-tool-lg" data-toggle="tooltip" data-placement="right" title="" id="OOMWazeButton" style="background-image: url(${wazerIcon}); background-size: 36px 36px; background-repeat: no-repeat; background-position: center;"></button>`; //'<div id="OOMWazeButtonDiv" style="height:30px; width:34px; position: fixed; right:30px; top:75px; cursor: pointer; ></div>';
        document.getElementsByClassName('btn-group-vertical js-appList')[0].appendChild($OOMWazeButton);

        document.getElementById("OOMWazeButton").addEventListener("click", function(){
            window.open(RosreestrToWaze());
        });
    }

    function bootstrapRosreestr(tries=1){
        if (document.getElementsByClassName('btn-group-vertical js-appList').length > 0) {
            initRosreestr();
        } else if (tries < 1000) {
            setTimeout(function () {bootstrapRosreestr(tries++);}, 200);
        }
    }

    function initGoogleMaps(){
        let $OOMWazeButton = document.createElement("div");
        $OOMWazeButton.innerHTML = `<div id="OOMWazeButtonDiv" style="height:36px; width:36px; position: fixed; right:30px; top:75px; cursor: pointer; background-image: url(${wazerIcon}); background-size: 36px 36px; background-repeat: no-repeat;" title="Open in WME"></div>`;
        let parent = document.getElementById("content-container");
        parent.appendChild($OOMWazeButton);

        document.getElementById("OOMWazeButtonDiv").addEventListener("click", function(){
            window.open(GMToWaze());
        });

        document.getElementById('OOMWazeButtonDiv').addEventListener("mouseenter",function(e) {
            document.addEventListener('keydown', copyPLHotkeyEvent);
            document.getElementsByClassName('widget-scene-canvas')[0].addEventListener('keydown', copyPLHotkeyEvent);
        });

        document.getElementById('OOMWazeButtonDiv').addEventListener('mouseleave', function() {
            document.removeEventListener('keydown', copyPLHotkeyEvent);
            document.getElementsByClassName('widget-scene-canvas')[0].removeEventListener('keydown', copyPLHotkeyEvent);
        });
    }

    let isMiss511Loaded = false;
    function initMississipie511(){
        map.addListener('tilesloaded', function() {
            //https://www.mdottraffic.com/default.aspx?lat=32.36435&lon=-88.70366&zoom=15
            if(!isMiss511Loaded){
                if(location.search.indexOf("?") > -1 && location.search.indexOf("loadAlertid") === -1){
                    let params = location.search.match(/lat=(-?\d*.\d*)&lon=(-?\d*.\d*)&zoom=(\d+)/);
                    map.setCenter({lat: parseFloat(params[1]), lng: parseFloat(params[2])});
                    map.setZoom(parseInt(params[3]));
                }
                isMiss511Loaded = true;
            }
        });

        let $OOMWazeButton = document.createElement("div");
        $OOMWazeButton.innerHTML = `<div id="OOMWazeButtonDiv" style="height:36px; width:36px; position: fixed; right:40px; top:83px; cursor: pointer; background-image: url(${wazerIcon}); background-size: 36px 36px; background-repeat: no-repeat;" title="Open in WME"></div>`;
        //let parent = document.getElementById("content-container");
        document.getElementById("map_canvas").appendChild($OOMWazeButton);

        document.getElementById("OOMWazeButtonDiv").addEventListener("click", function(){
            let center = map.getCenter();
            window.open(`https://www.waze.com/en-US/editor/?lon=${center.lng()}&lat=${center.lat()}&zoom=${(Math.max(0,Math.min(10,(map.getZoom() - 12))))}`);
        });
    }

/*    function initNJ511(){
        $(document).ready(function() {
                if(location.search.indexOf("?") > -1){
                    let params = location.search.match(/X=(-?\d*.\d*)&Y=(-?\d*.\d*)&zoom=(\d+)/);
                    $("#EvetnsMap").attr('src', `http://icx1-map21x.lan.511nj.org/mapwidget/mapwidget.aspx?FullScreen=false&fss=0&njlegend=1&search=0&X=${parseFloat(params[1])}Y=${parseFloat(params[2])}&zoom=${parseFloat(params[3])}&maplegend=2&Weather=1&Congestion=1&Construction=1&Incident=1&Detour=1&SpecialEvents=1&AirportParking=0&height=100&width=100&ispercent=1&WinkCamera=2&zoom=14&refershcamera=1&refershevent=1&refershspeed=1`);
                }
        });
    }*/

    function insertWMELinkNM511(){
        if(document.getElementById("OOMWazeButton") !== null)
            document.getElementById("OOMWazeButton").remove();

        let $OOMWazeButton = document.createElement("li");

        $OOMWazeButton.innerHTML = `<span id="OOMWazeButton" style="background-image: url(${wazerIcon}); background-size: 36px 36px;"></span>`;
        document.getElementsByClassName('mapSettingsList')[0].appendChild($OOMWazeButton);

        document.getElementById("OOMWazeButton").addEventListener("click", function(){
            let source = new Proj4js.Proj('EPSG:900913');
            let center = map.extent.getCenter();
            var point = new Proj4js.Point(parseFloat(center.x), parseFloat(center.y));
            Proj4js.transform(source, Proj4js.WGS84, point);
            window.open(`https://www.waze.com/en-US/editor/?lon=${point.x}&lat=${point.y}&zoom=${(Math.max(0,Math.min(10,(map.getZoom() - 12))))}`);
        });
    }

    function initNM511(){
        if(location.search.indexOf("?") > -1){
            let params = location.search.match(/X=(-?\d*.\d*)&Y=(-?\d*.\d*)&zoom=(\d+)/);
            setTimeout(function(){
                try{
                    map.centerAt({x:parseFloat(params[1]), y:parseFloat(params[2])});
                    setTimeout(function(){map.setLevel(parseInt(params[3]));}, 500);
                }
                catch(err) {
                    console.log(err);
                }
            }, 1000);
        }

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes" && mutation.target == document.getElementsByClassName("mapSettingsList")[0]) insertWMELinkNM511();
            });
        });

        observer.observe(document.getElementsByClassName('mapSettings')[0], { childList: true, subtree: true, attributes:true});

        insertWMELinkNM511();
    }

    function insertWMELinkRoadworks(){
        if(document.getElementById("OOMWazeButton") !== null)
            document.getElementById("OOMWazeButton").remove();

        let $OOMWazeButton = document.createElement("li");
        $OOMWazeButton.style.minHeight = "60px";
        $OOMWazeButton.id = "OOMWazeButton";
        $OOMWazeButton.innerHTML = `<a href="#"><span style="background-image: url(${wazerIcon}); background-size: 36px 36px; background-repeat:no-repeat; background-position:center;"></span></a>`;
        document.getElementById('nav-main').getElementsByTagName('ul')[0].appendChild($OOMWazeButton);

        document.getElementById("OOMWazeButton").addEventListener("click", function(){
            let source = new Proj4js.Proj('EPSG:900913');
            let center = Elgin.map.getCenter();
            window.open(`https://www.waze.com/en-US/editor/?lon=${center.lng()}&lat=${center.lat()}&zoom=${(Math.max(0,Math.min(10,(Elgin.map.zoom - 12))))}`);
        });
    }

    function initRoadworks(){
        if(location.search.indexOf("?") > -1){
            let params = location.search.match(/lng=(-?\d*.\d*)&lat=(-?\d*.\d*)&zoom=(\d+)/);
            setTimeout(function(){
                try{
                    Elgin.map.setCenter({lng:parseFloat(params[1]), lat:parseFloat(params[2])});
                    setTimeout(function(){Elgin.map.setZoom(parseInt(params[3]));}, 500);
                }
                catch(err) {
                    console.log(err);
                }
            }, 1000);
        }
        insertWMELinkRoadworks();
    }

    var copyToClipboard = function(str) {
        var temp = document.createElement("input");
        document.body.append(temp);
        temp.value = str;
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
    };

    var copyPLHotkeyEvent = function(e) {
        if ((e.metaKey || e.ctrlKey) && (e.which === 67))
            copyToClipboard(GMToWaze());
    };

    function GMToWaze(){
        let lon, lat, zoom;
        let curURL = location.href.split('@').pop().split(',');
        lon = curURL[1];
        lat = curURL[0];
        zoom = parseInt(curURL[2]);
        return `https://www.waze.com/en-US/editor/?lon=${lon}&lat=${lat}&zoom=${(Math.max(0,Math.min(10,(zoom - 12))))}`;
    }

    function init511PA(){
        $('#OOMWazeButtonDiv').remove();
        let $wazer = $("<div>", {style:"padding:8px 16px"});
        $wazer.html([
            '<li>',
            `<div id="OOMWazeButtonDiv" style="height:36px; width:36px;  cursor: pointer; background-image: url(${wazerIcon}); background-size: 36px 36px; background-repeat: no-repeat;" title="Open in WME"></div>`,
            '</li>'
        ].join(' '));

        $('#optMain').append($wazer.html());

        $('#OOMWazeButtonDiv').click(function(){
            let lon, lat, zoom;
            let latlon = iFrameVar.getCenterOfMap().split(',');
            lon = latlon[1];
            lat = latlon[0];
            zoom = iFrameVar.zoom;
            window.open(`https://www.waze.com/en-US/editor/?lon=${lon}&lat=${lat}&zoom=${(Math.max(0,Math.min(10,(zoom - 12))))}`);
        });
    }

    function init511virginia(){
        $('#incident_table_paginate > a').click(insertWazeLinks511Virginia);
        insertWazeLinks511Virginia();
    }

    function insertWazeLinks511Virginia(){
        $('#incident_table > tbody > tr > td > a').parent().append(function(){
            if($(this).find("a").length === 1){
                let latlons = $(this).find("a")[0].href.match(/lon1=(.*)&lat1=(.*)&lon2=(.*)&lat2=(.*)/);

                let lonCenter = Math.min(latlons[1],latlons[3]) + (Math.abs(latlons[1] - latlons[3])/2);
                let latCenter = Math.min(latlons[2], latlons[4]) + (Math.abs(latlons[2] - latlons[4])/2);
                return ` <a href='https://www.waze.com/editor/?env=usa&lon=${lonCenter}&lat=${latCenter}&zoom=4' target='_blank'>Open in WME</a>`;
            }
            return "";
        });
    }

    function initNE511(){
        var observer = new MutationObserver(function(mutations) {
               mutations.forEach(function(mutation) {
                   if ($(mutation.target)[0] == $('.ol-overlay-container.ol-selectable')[0] && $(mutation.target).css('display') == "block") {
                       insertWMELinkNE511();
                   }
               });
           });

        observer.observe($('.ol-overlay-container.ol-selectable').parent()[0], { childList: true, subtree: true, attributes:true});
    }

    function insertWMELinkNE511(){
        //http://newengland511.org/
        let selectedIncident = $('.popover-content > [data-ng-bind="item.Description"]')[0];
        let incidentDesc = selectedIncident.innerHTML;
        let incidents = Leidos.Traffic.Data.events.find(function(e){ return e.Description == incidentDesc;});

        $(selectedIncident).append(`<br><a href='https://www.waze.com/en-US/editor/?env=usa&lon=${incidents.StartLongitude}&lat=${incidents.StartLatitude}&zoom=6' target="_blank">Open in WME</a>`);
    }

    function initmiDrive(){
        var observer = new MutationObserver(function(mutations) {
               mutations.forEach(function(mutation) {
                   if ($(mutation.target).hasClass('esri-popup__content')) insertWMELinkMiDrive(mutation.target);
               });
           });

        observer.observe($('.esri-component.esri-popup')[0], { childList: true, subtree: true });

        $('#layerContainer').append(`<button tabindex="0" class="legendIcon layerIcon clickableLegendIcon ui-btn ui-btn-inline" title="Open in WME" id="oomOpenWME"><img tabindex="-1" class="focusRem" src="${wazerIcon}" alt="icons"></button>`);
        $('#legendIconContainer').css('width', (325));
        $('#oomOpenWME').click(function(){
            window.open(`https://www.waze.com/en-US/editor/?lon=${mapView.center.longitude}&lat=${mapView.center.latitude}&zoom=${Math.max(mapView.zoom-12,0)}`);
        });
    }

    function insertWMELinkMiDrive(changedDiv){
        for(let i=0; i<incidents.graphics.items.length; i++){
            let location = incidents.graphics.items[i].attributes.Message.match(/<strong>Location: <\/strong>(.*?)<\/div>/)[1];
            if($(changedDiv).html().indexOf(location) > -1 && $(changedDiv).html().indexOf("Open in WME") === -1){
                $('#newItemAdded').append(`<div><a href='https://www.waze.com/en-US/editor/?env=usa&lon=${incidents.graphics.items[i].attributes.XCoord}&lat=${incidents.graphics.items[i].attributes.YCoord}&zoom=6' target="_blank">Open in WME</a></div>`);
                break;
            }
        }
    }

    function initWV511(){
        if(document.getElementById("OOMWazeButtonDiv") !== null)
            document.getElementById("OOMWazeButtonDiv").remove();

        let $OOMWazeButton = document.createElement("div");
        $OOMWazeButton.setAttribute("id", "OOMWazeButtonDiv");
        $OOMWazeButton.setAttribute("style", `position:absolute; right:15px; top:190px; height:36px; width:36px; cursor:pointer; background-image: url(${wazerIcon}); background-size: 36px 36px; background-repeat:no-repeat;`);
        $OOMWazeButton.setAttribute("title", "Open in WME");
        document.body.appendChild($OOMWazeButton);

        document.getElementById("OOMWazeButtonDiv").addEventListener("click", function(){
            let lon1, lon2, lonCenter, lat1, lat2, latCenter;
            let latlon = location.href.split(":");
            lon1 = latlon[2];
            lat1 = latlon[3];
            lon2 = latlon[4];
            lat2 = latlon[5];

            lonCenter = Math.min(lon1,lon2) + (Math.abs(lon1 - lon2)/2);
            latCenter = Math.min(lat1, lat2) + (Math.abs(lat1 - lat2)/2);
            window.open(`https://www.waze.com/en-US/editor/?lon=${lonCenter}&lat=${latCenter}&zoom=5`);
        });
    }

    function initWVGIS(){
        if(document.getElementById("OOMWazeButtonDiv") !== null)
            document.getElementById("OOMWazeButtonDiv").remove();
        $('#RoadLayerList').prepend(`<li><div id="OOMWazeButtonDiv" aria-hidden="true" style="cursor:pointer; margin-top:8px; height:36px; width:36px; background-image: url(${wazerIcon}); background-size: 36px 36px; background-repeat:no-repeat;"></div></li>`);
        $('#OOMWazeButtonDiv').click(function(){
            let source = new Proj4js.Proj('EPSG:900913');
            var point = new Proj4js.Point(parseFloat(view.center.x), parseFloat(view.center.y));
            Proj4js.transform(source, Proj4js.WGS84, point);

            window.open(`https://www.waze.com/en-US/editor/?lon=${point.x}&lat=${point.y}&zoom=${view.zoom-5}`);
        });
    }

    function initWVFlood(){
        if($("#OOMWazeButtonDiv") !== null)
            $("#OOMWazeButtonDiv").remove();

        $('#tools').prepend(`<button type="button" id="btnOpenWaze" class="btn btn-default btn-lg bootstrap_btn2" style="cursor:pointer; margin-left: 0px; min-width:32px; height=32px; background-image: url(${wazerIcon}); background-size: 32px 32px; background-repeat:no-repeat; background-size:100%;" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="click to open in Waze Map Editor"><span ></span></button>`);

        $('#btnOpenWaze').click(function(){
            let source = new Proj4js.Proj('EPSG:900913');
            var point = new Proj4js.Point(parseFloat(Flood.map.extent.getCenter().x), parseFloat(Flood.map.extent.getCenter().y));
            Proj4js.transform(source, Proj4js.WGS84, point);
            let zoom = Flood.map.getLevel() - 4;
            if(zoom < 0)
                zoom = 0;

            window.open(`https://www.waze.com/en-US/editor/?lon=${point.x}&lat=${point.y}&zoom=${zoom}`);
        });
    }

    bootstrap();
})();
