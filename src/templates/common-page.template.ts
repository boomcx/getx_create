import * as changeCase from "change-case";
import { existsSync, lstatSync, writeFile } from "fs";

// index
export function indexTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/${pageName}.dart`;
  const template = `library ${snakeCaseName};

export './views/${snakeCaseName}_view.dart';
export './providers/${snakeCaseName}_provider.dart';
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
  const targetPath = `${targetDirectory}/${pageName}/providers/${pageName}_provider.dart`;
  const template = `import 'package:riverpod_annotation/riverpod_annotation.dart';
part '${snakeCaseName}_provider.g.dart';

@riverpod
class ${pascalCaseName} extends _$${pascalCaseName} {
  @override
  int build() => 0;

  void increment() {
    state += 1;
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

// view
export function viewTemplate(pageName: string, targetDirectory: string) {
  const pascalCaseName = changeCase.pascalCase(pageName.toLowerCase());
  const snakeCaseName = changeCase.snakeCase(pageName.toLowerCase());
  const targetPath = `${targetDirectory}/${pageName}/views/${snakeCaseName}_view.dart`;
  const template = `import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:flutter/material.dart';
import '../providers/${snakeCaseName}_provider.dart';

class ${pascalCaseName}View extends ConsumerWidget {
  const ${pascalCaseName}View({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('${pascalCaseName} View')),
      body: Center(
        child: Column(
          children: [
            Text(
              '${pascalCaseName} Counter:\${ref.watch(${snakeCaseName}Provider)}',
            ),
            ElevatedButton(
              onPressed: ref.read(${snakeCaseName}Provider.notifier).increment,
              child: const Text('increment'),
            ),
          ],
        ),
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
