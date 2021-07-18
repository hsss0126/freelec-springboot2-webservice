var main = {
    init : () => {
        var _this = this.main;
        $('#btn-save').on('click', () => {
            _this.save();
        });
        $('#btn-update').on('click', () => {
            _this.update();
        });
        $('#btn-delete').on('click', () => {
            _this.deleteById();
        });
    },
    save : () => {
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(data)
        }).done(() => {
            alert('글이 등록되었습니다.');
            window.location.href = "/";
        }).fail((error) => {
            alert(JSON.stringify(error));
        });
    },
    update: () => {
        var id = $('#id').val();
        var data = {
            title: $('#title').val(),
            content: $('#content').val()
        };

        $.ajax({
            type: 'PUT',
            url: `/api/v1/posts/${id}`,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(data)
        }).done(() => {
            alert('글이 수정되었습니다.');
            window.location.href = "/";
        }).fail((error) => {
            alert(JSON.stringify(error));
        });
    },
    deleteById: () => {
        var id = $('#id').val();

        $.ajax({
            type: 'DELETE',
            url: `/api/v1/posts/${id}`,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
        }).done(() => {
            alert('글이 삭제되었습니다.');
            window.location.href = "/";
        }).fail((error) => {
            alert(JSON.stringify(error));
        });
    }
};

main.init();