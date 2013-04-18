Forms.loginPage = SC.Page.design({
  loginPane: SC.MainPane.design({
    childViews: "workspace".w(),


    workspace: SC.WorkspaceView.extend({
      topToolbar: SC.ToolbarView.extend({
        childViews: "label".w(),

        label: SC.LabelView.design({
          layout: {height: 24, left: 0, right: 0, centerY: 0},

          value: "Login to iDAT",
          textAlign: SC.ALIGN_CENTER,

          controlSize: SC.LARGE_CONTROL_SIZE,
        }),
      }),

      contentView: SC.ScrollView.extend({
      contentView: SC.View.extend({
        childViews: 'form'.w(),

        form: Forms.FormView.design({
          controlSize: SC.LARGE_CONTROL_SIZE,
          childViews: 'logo title username password name login version'.w(),
          layout: SC.browser.isMobile ? {} : {width: 320, height: 480, centerX: 0, centerY: 0},

          logo: SC.ImageView.extend({
            layout: {width: 310, height: 106},
            value: sc_static('arcbalogo.jpg'),
            scale: SC.BEST_FIT,
            useCanvas: NO,

            className: 'login-logo',
            fillWidth: YES,
          }),

          title: SC.LabelView.extend({
            layout: {width: 310, height: 50},
            controlSize: SC.LARGE_CONTROL_SIZE,
            value: 'iDAT Casework System',
            textAlign: SC.ALIGN_CENTER,
          }),

          username: Forms.FormView.row('Username:', SC.TextFieldView.design({
            layout: {width: 150, height: 24},
            valueBinding: "Forms.loginController.username",
            autoCapitalize: false,
            autoCorrect: false
          })),
          password: Forms.FormView.row('Password:', SC.TextFieldView.design({
            layout: {width: 150, height: 24}, 
            type: 'password',
            valueBinding: "Forms.loginController.password",
          })),
          name: Forms.FormView.row('Your Name:', SC.TextFieldView.design({
            layout: {width: 150, height: 24},
            valueBinding: "Forms.loginController.name",
          })),
          login: SC.ButtonView.extend({
            title: 'Login',
            layout: {left: 0, right: 0, height: 30},
            target: 'Forms.statechart',
            action: 'doLogin',
            isDefault: true,
            controlSize: SC.HUGE_CONTROL_SIZE,
            fillWidth: YES,
          }),

          version: SC.LabelView.extend({
            layout: {width: 310, height: 60},
            //fillRemaining: YES,
            value: function() {
              return "Version: %@\nBuild Date: %@".fmt(Forms.VERSION, Forms.BUILD_DATE);
            }.property(),
            textAlign: SC.ALIGN_CENTER,
          }),
        })
      })
}),
    })
  }),

  workingPane: SC.PanelPane.extend({
    message: '',

    contentView: SC.View.extend({
      childViews: 'labelView'.w(),

      labelView: SC.LabelView.extend({
        layout: {centerY: 0, left: 0, right: 0, height: 30},
        controlSize: SC.LARGE_CONTROL_SIZE,
        valueBinding: ".pane.message",
        textAlign: SC.ALIGN_CENTER
      })
    })
  })
})