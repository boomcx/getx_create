import * as changeCase from "change-case";
import { existsSync, lstatSync, writeFile } from "fs";

// index
export function indexTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/${snakeCaseName}.dart`;
  const template = `library ${snakeCaseName};

import 'package:get/get.dart';
import './src/controller.dart';

export './src/controller.dart';
export './src/view.dart';

/// 独立到每个页面，用脚本生成对应的路由名称
/// 路由名称
///
const String kRoute${pascalCaseName} = '/${snakeCaseName}';

/// AppPages : 注册 GetPage
/// 可以直接复制到 AppPages 文件中注册页面路由
///
/// \`\`\`
///    GetPage(
///       name: kRoute${pascalCaseName},
///       page: () => const ${pascalCaseName}View(),
///       binding: ${pascalCaseName}Binding(),
///     ),
/// \`\`\`
/// 
class ${pascalCaseName}Binding extends Binding {
  @override
  List<Bind> dependencies() {
    return [
      Bind.lazyPut<${pascalCaseName}Controller>(
        () => ${pascalCaseName}Controller(),
      )
    ];
  }
}

`;

  return new Promise(async (resolve, reject) => {
    writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve;
    });
  });
}

// controller
export function controllerTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/src/controller.dart`;
  const template = `import '/app.dart';

class ${pascalCaseName}Controller extends BaseViewController { 
}
`;

  return new Promise(async (resolve, reject) => {
    writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve;
    });
  });
}

// view
export function viewTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/src/view.dart`;
  const template = `import 'package:flutter/material.dart';
import '/app.dart';

import 'controller.dart';

class ${pascalCaseName}View extends BaseView<${pascalCaseName}Controller> {
  const ${pascalCaseName}View({super.key});

  @override
  PreferredSizeWidget? buildAppBar(BuildContext context) {
    return AppBar(title: const Text("${snakeCaseName}"));
  }

  @override
  Widget buildBody(BuildContext context) {
    return  Center(
        child: Text("${pascalCaseName}View"),
    );
  }
}
`;

  return new Promise(async (resolve, reject) => {
    writeFile(targetPath, template, "utf8", (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve;
    });
  });
}
