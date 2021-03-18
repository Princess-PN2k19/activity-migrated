interface IProps{
    show: boolean
}

function EditCompany(props: IProps) {
    const { show } = props;
    if (!show){
        return null;
    }
    return (
        <div className="modal">
            <div className="modal_content">
                <div>
                    <span>

                    </span>
                    <form>
                        <h3>Edit Company</h3>
                        <label>
                            Company Name:
                        <input type="text" name="companyName" />
                        </label>
                        <br /><br />
                        <input type="submit" />
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCompany;