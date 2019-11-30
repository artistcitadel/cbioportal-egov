<div class="oncokb-card" data-test='oncokb-card'>
    <div>
        <%--{!this.props.geneNotExist && (--%>
        <span>
          <div class="tabs-wrapper">
            <div class="title" data-test="oncokb-card-title">
              title
            </div>
            <div class="tabs">
              <div key="oncogenicity" class="tab enable-hover">
                <a class="oncogenicity tab-title-a enable-hover-a enable-hover-active" onClick="handleOncogenicityTabSelect()">
                  <span class="tab-title">clinical implications</span>
                  <span class="tab-subtitle">
                        Likely Oncogenic
                  </span>
                </a>
              </div>
              <div key="mutationEffect" class="tab enable-hover">
                  <a class="mutation-effect tab-title-a enable-hover-a"
                     <%--this.activeTab === "mutationEffect" ? mainStyles["enable-hover-active"] : '')--%>
                  onClick="handleMutationEffectTabSelect()" >
                      <span class="tab-title">Biological Effect</span>
                      <span class="tab-subtitle">
                          Likely Gain-of-function
                      </span>
                  </a>
              </div>
              <div class="indicator"/>
            </div>





         </div>
        </span>
     </div>
  </div>