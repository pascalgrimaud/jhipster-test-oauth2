/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TotoComponentsPage, TotoDeleteDialog, TotoUpdatePage } from './toto.page-object';

const expect = chai.expect;

describe('Toto e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let totoUpdatePage: TotoUpdatePage;
    let totoComponentsPage: TotoComponentsPage;
    let totoDeleteDialog: TotoDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.loginWithOAuth('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Totos', async () => {
        await navBarPage.goToEntity('toto');
        totoComponentsPage = new TotoComponentsPage();
        expect(await totoComponentsPage.getTitle()).to.eq('Totos');
    });

    it('should load create Toto page', async () => {
        await totoComponentsPage.clickOnCreateButton();
        totoUpdatePage = new TotoUpdatePage();
        expect(await totoUpdatePage.getPageTitle()).to.eq('Create or edit a Toto');
        await totoUpdatePage.cancel();
    });

    it('should create and save Totos', async () => {
        const nbButtonsBeforeCreate = await totoComponentsPage.countDeleteButtons();

        await totoComponentsPage.clickOnCreateButton();
        await promise.all([totoUpdatePage.setNameInput('name')]);
        expect(await totoUpdatePage.getNameInput()).to.eq('name');
        await totoUpdatePage.save();
        expect(await totoUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await totoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Toto', async () => {
        const nbButtonsBeforeDelete = await totoComponentsPage.countDeleteButtons();
        await totoComponentsPage.clickOnLastDeleteButton();

        totoDeleteDialog = new TotoDeleteDialog();
        expect(await totoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Toto?');
        await totoDeleteDialog.clickOnConfirmButton();

        expect(await totoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
