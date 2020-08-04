var Generator = require('yeoman-generator');
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    // this.option('babel'); // This method adds support for a `--babel` flag

    // 不执行
    // this.helperMethod = function () {
    //   console.log("won't be called automatically");
    // };

    // // This makes `appname` a required argument.
    // this.argument('appname', { type: String, required: true });
    // // And you can then access it later; e.g.
    // this.log(this.options.appname);

    // // This method adds support for a `--coffee` flag
    // this.option('coffee');
    // // And you can then access it later; e.g.
    // this.scriptSuffix = this.options.coffee ? '.coffee' : '.js';
  }
  // method1() {
  //   this.log('method1 just run');
  // }
  // method2() {
  //   this.log('method2 just run');
  // }
  // // 私有方法不执行
  // _private_method() {
  //   console.log('private hey');
  // }
  // async prompting() {
  // this.answers = await this.prompt([
  //   {
  //     type: 'confirm',
  //     name: 'cool',
  //     message: 'Would you like to enable the Cool feature?',
  //   },
  // ]);
  // }

  // writing() {
  //   this.log('cool feature', this.answers.cool); // user answer `cool` used
  // }
  async prompting() {
    this.dependency = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Would you like to enable the Cool feature?',
      },
    ]);
  }
  // writing() {
  //   const pkgJson = {
  //     dependencies: {
  //       [this.dependency.name]: '*',
  //     },
  //   };

  //   // Extend or create package.json file in destination path
  //   this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
  // }

  // install() {
  //   this.npmInstall();
  // }
  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: this.dependency.name }
    );
  }
};
