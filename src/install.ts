import {IPackageJSON} from './types';
import { read, addProps, save } from './file-modifier';

const packageJson: IPackageJSON = read();
addProps(packageJson);
save(packageJson);
