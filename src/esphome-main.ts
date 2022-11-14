import "./devices/devices-list";
import "./components/esphome-header-menu";
import "./components/esphome-fab";
import { LitElement, html, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("esphome-main")
class ESPHomeMainView extends LitElement {
  @property() version = "unknown";

  @property() docsLink = "";

  @property() logoutUrl?: string;

  @state() private editing?: string;

  @state() private showSearch: boolean = false;

  protected render() {
    if (this.editing) {
      return html`
        <style>
          esphome-editor {
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
          }
        </style>
        <esphome-editor
          @close=${this._handleEditorClose}
          fileName=${this.editing}
        ></esphome-editor>
      `;
    }
    return html`
      <header class="esphome-header">
        <img src="static/images/logo-text.svg" alt="ESPHome Logo" />
        <div class="flex"></div>
        <esphome-header-menu
          .logoutUrl=${this.logoutUrl}
          @toggle-search=${this._toggleSearch}
        ></esphome-header-menu>
      </header>

      <main>
        <esphome-devices-list
          .showSearch=${this.showSearch}
        ></esphome-devices-list>
      </main>

      <esphome-fab></esphome-fab>

      <footer class="page-footer grey darken-4">
        <div class="container">
          <div class="left">
            ESPHome by Nabu Casa |
            <a href="https://esphome.io/guides/supporters.html" target="_blank"
              >Fund development</a
            >
            |
            <a href=${this.docsLink} target="_blank" rel="noreferrer"
              >v${this.version} Documentation</a
            >
          </div>
        </div>
      </footer>
    `;
  }
  createRenderRoot() {
    return this;
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);
    document.body.addEventListener<any>("edit-file", (ev) => {
      this.editing = ev.detail;
    });
    import("./editor/esphome-editor");
  }

  private _handleEditorClose() {
    this.editing = undefined;
  }

  private _toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-main": ESPHomeMainView;
  }
}
