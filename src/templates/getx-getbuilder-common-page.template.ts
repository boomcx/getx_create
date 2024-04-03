import * as changeCase from "change-case";
import { existsSync, lstatSync, writeFile } from "fs";

// index
export function indexTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/${snakeCaseName}.dart`;
  const template = `library ${snakeCaseName};

import 'package:get/get.dart';
import './controller.dart';

export './controller.dart';
export './view.dart';

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
///       page: () => ${pascalCaseName}View(),
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
  const targetPath = `${targetDirectory}/${pageName}/controller.dart`;
  const template = `import 'package:get/get.dart';

class ${pascalCaseName}Controller extends GetxController { 
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
  const targetPath = `${targetDirectory}/${pageName}/view.dart`;
  const template = `import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'controller.dart';

class ${pascalCaseName}View extends GetView<${pascalCaseName}Controller> {
  const ${pascalCaseName}View({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("${snakeCaseName}")),
      body: Center(
        child: Text("${pascalCaseName}View"),
      ),
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
