import { App, Editor, MarkdownRenderChild, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import * as BabylonViewer from 'babylonjs-viewer'; // https://doc.babylonjs.com/setup/frameworkPackages/npmSupport
import * as path from 'path';
export default class ThreeDModelViewerPlugin extends Plugin {
	async onload() {
		console.log('loading 3-D viewer plugin');
		this.registerMarkdownPostProcessor((element, context) => {
			//@ts-ignore
			const basePath = this.app.vault.adapter.basePath; // private API ??
			const reldir = path.dirname(context.sourcePath);
			const elems = element.querySelectorAll(".internal-embed");
			for (let index = 0; index < elems.length; index++) {
				const elm = elems.item(index);			  
				const src = elm.getAttribute('src');
				let div = document.createElement('div');
				elm.before(div);
				if (src?.endsWith(".glb") || src?.endsWith(".gltf") || src?.endsWith(".obj")){
					// https://doc.babylonjs.com/features/featuresDeepDive/babylonViewer/configuringViewer
					let viewer = new BabylonViewer.DefaultViewer(div, {
						model: {
							url: 'app://local' + path.join(basePath,reldir,src) // URL needs to be app://local/.... or https://...
						}
					});
				}				  
			}			
		  });
	}
	onunload() {}
}