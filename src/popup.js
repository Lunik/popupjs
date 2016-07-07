function _Popup () {
  // Initialisation du popup
  this.init = function (obj) {
    this.posX = formatPos(obj.pos.x)
    this.posY = formatPos(obj.pos.y)
    this.width = formatWidth(obj.width)
    /*if (this.width > 500) {
      this.whidth = 500
    }*/
    this.height = formatHeight(obj.height)
    this.title = obj.title
    this.html = obj.html
    this.closeBut = obj.closeBut
  }

  // Ouvrir le popup
  this.draw = function () {
    // Creation de l'ombre
    var $shadow = $('<div>').addClass('popupShadow').click(function () {
      this.remove()
    })

    this.selector = $shadow
    // Creation du contenu du popup
    var $container = $('<div>').addClass('popupContainer').click(function (event) {
      event.stopPropagation()
    })
      .css('width', this.width + 'px')
      .css('height', this.height + 'px')
      .css('margin-top', this.posY + 'px')
      .css('margin-left', this.posX + 'px')

    if (this.closeBut) {
      // Creation du bouton de fermeture du popup
      $('<button>').addClass('popupClose')
        .css('margin-top', -15)
        .css('margin-left', this.width - 15)
        .click(function () {
          $shadow.remove()
        })
        .appendTo($container)
    }

    $container.append(
      $('<h1>').addClass('popupTitle').append(this.title),
      $('<p>').addClass('popupHtml').append(this.html)
    ).appendTo($shadow)
    $shadow.appendTo($('body'))
  }

  this.center = function () {
    this.posX = null
    this.remove()
    this.draw()
  }

  // Fermer le popup
  this.remove = function () {
    this.selector.remove()
  }

  function formatWidth (width) {
    if (width) {
      width = width.toString()
      if (width.indexOf('%') !== -1) {
        width = width.split('%')[0]
        width = parseInt((width * $(window).width()) / 100, 10)
      }
    }
    return width
  }

  function formatHeight (height) {
    if (height) {
      height = height.toString()
      if (height.indexOf('%') !== -1) {
        height = height.split('%')[0]
        height = parseInt((height * $(window).height()) / 100, 10)
      }
    }
    return height
  }

  function formatPos (pos) {
    return formatHeight(pos)
  }
}
