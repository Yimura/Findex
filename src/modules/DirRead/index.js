import { ModuleBuilder } from 'waffle-manager';
import fs from 'fs/promises';

const name = 'dirread';

export const ModuleInfo = new ModuleBuilder(name);

export const ModuleInstance = class {

    constructor(main) {
        this.name = name;
        this.config = main.config.fs;
        this.log = main.log;
    }

    //required for Modules.load() using waffle manager
    async init() {
        this.log.info(name.toUpperCase(), `Starting ${name}...`);

        return true;
    }

    async createDirectory(path) {
        try {
            fs.mkdir(`${this.config.defaultPath}${path}`);
            return path;
        } catch (e) {
            return;
        }
    }

    async readDirectory(path) {
        let filesList = [];
        const files = await this.getAllFiles(`${this.config.defaultPath}${path}`);
        for (const file of files) {
            const extension = file.name.split('.').pop();
            let stats = await fs.stat(file.path, (error, stats) => {
                if (error) {
                    console.log(error);
                }
            });

            if (stats) {
                const splits = file.path.split('/');
                splits.pop();
                const fileObj = {
                    name: file.name,
                    extension,
                    parent: splits.join('/'),
                    size: stats.size,
                    lastAccess: stats.atime,
                    lastModified: stats.mtime,
                    lastStatusChanged: stats.ctime,
                    created: stats.birthtime
                };
                filesList.push(fileObj);
            }
        }

        return filesList;
    }

    async getAllFiles(path) {
        const entries = await fs.readdir(path, {withFileTypes: true});

        // Get files within the current directory and add a path key to the file objects
        const files = entries
            .filter(file => !file.isDirectory())
            .map(file => ({ ...file, path: path + file.name }));

        // Get folders within the current directory
        const folders = entries.filter(folder => folder.isDirectory());
        
        for (const folder of folders) {
            files.push(...await this.getAllFiles(`${path}${folder.name}/`));
        }
        return files
    }

    //required for Modules.cleanup() using waffle manager
    async cleanup() {}

}