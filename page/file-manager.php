    <!-- File information Modal -->
    <section id="file-info-modal" class="uk-card" uk-modal>
        <div class="uk-modal-dialog">
            <div class="uk-modal-header">
                <button class="uk-modal-close-outside" type="button" uk-close></button>
                <h3 id="item-title" class="uk-card-title">File info:</h3>
            </div>
            <div class="uk-modal-body">
                <div class="uk-child-width-1-2" uk-grid>
                    <div class="uk-text-nowrap">
                        <p>Filetype: <p id="item-Type" class="uk-text-meta"></p></p>
                    </div>
                    <div class="">

                    </div>
                </div>
            </div>
            <div class="uk-modal-footer">

            </div>
        </div>
    </section>
    <?php if (!$isGuest) { ?>
    <!-- Delete Confirm Modal -->
    <section id="modal-confirm" uk-modal>
        <div class="uk-modal-dialog file-remove-modal uk-margin-auto-vertical">
            <div class="uk-modal-header">
                <h2 class="uk-modal-title">Remove this item?</h2>
            </div>
            <div class="uk-modal-body">
                <p>Are you sure you want to remove this item?</p>
                <label class="cursor-pointer"><input id="remove-perm" class="uk-checkbox uk-margin-small-right" type="checkbox" checked> Permanently remove item?</label>
                <input id="remove-file-confirm" type="hidden" name="" value="">
            </div>
            <div class="uk-modal-footer uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close uk-margin-right" type="button">Cancel</button>
                <button id="confirm-remove-file" class="uk-button uk-button-danger" type="button">Remove</button>
            </div>
        </div>
    </section>
    <!-- Upload files modal -->
    <section id="modal-upload" uk-modal>
        <div class="uk-modal-dialog round uk-margin-auto-vertical">
            <button class="uk-modal-close-outside" type="button" uk-close></button>
            <div class="uk-modal-header">
                <h2 class="uk-modal-title" id="view-file">Upload Files</h2>
            </div>
            <div class="uk-modal-body">
                <div class="js-upload uk-placeholder uk-text-center">
                    <span uk-icon="icon: cloud-upload"></span>
                    <span class="uk-text-middle">Upload files by dropping them here or</span>
                    <div uk-form-custom>
                        <input type="file" name="files[]">
                        <span class="uk-link">select your file</span>
                    </div>
                </div>
                <progress id="upload-progressbar" class="uk-progress" value="0" max="100" hidden></progress>
            </div>
            <div class="uk-modal-footer uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close uk-margin-right" type="button">Cancel</button>
                <button class="uk-button uk-button-primary" type="button">Done</button>
            </div>
        </div>
    </section>
    <?php } ?>
    <?php if ($isGuest && !isset($_COOKIE['alertPublicSeen'])) { ?>
    <!-- Public folder alert -->
    <div uk-alert>
        <a id="close-public-alert" class="uk-alert-close" uk-close></a>
        <h3>Notice</h3>
        <p>This is a public folder, only admins can add files in this folder!</p>
    </div><?php } ?>
    <!-- Files Container -->
    <section class="main-section">
        <table id="item-table" class="uk-table uk-table-divider uk-table-hover uk-table-middle">
            <thead>
                <tr>
                    <th><a id="goup-dir" class="uk-link-reset uk-hidden"><span uk-icon="icon: arrow-up; ratio: 1.2"></span></a></th>
                    <th class="uk-text-center">Name</th>
                    <th class="uk-text-center hide-table-row">Tools</th>
                    <th class="uk-text-center">Size</th>
                </tr>
            </thead>
            <tbody id="file-wrapper">

            </tbody>
        </table>
    </section>
</div>
